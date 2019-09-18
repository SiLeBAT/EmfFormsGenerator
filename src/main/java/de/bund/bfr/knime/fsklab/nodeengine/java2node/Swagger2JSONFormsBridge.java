package de.bund.bfr.knime.fsklab.nodeengine.java2node;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import io.swagger.models.Swagger;
import io.swagger.parser.SwaggerParser;
import io.swagger.util.Yaml;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.stream.Stream;

public class Swagger2JSONFormsBridge {
    static Map<String, String> filesAndContent = new Hashtable<String, String>();

    static String convertYamlToJson(String yaml) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper yamlReader = new ObjectMapper(new YAMLFactory());
        Object obj = yamlReader.readValue(yaml, Object.class);

        ObjectMapper jsonWriter = new ObjectMapper();
        return jsonWriter.writeValueAsString(obj);
    }

    public static void main(String[] args) {

        Swagger swagger = new SwaggerParser().read("./model.yaml");

        try {
            FileUtils.cleanDirectory(new File("./generatedswaggersubfiles"));
            FileUtils.cleanDirectory(new File("./generatedswaggermainfiles"));
            String yaml = Yaml.mapper().writeValueAsString(swagger);
            System.out.println();

            String contents = convertYamlToJson(yaml);

            ObjectNode jObject2 = (ObjectNode) Yaml.mapper().readTree(contents).get("definitions");
            iterateOverJSONObject("", "Root", jObject2, false, "");

            // Make in-Memory map to keep the Objects for later
            try (Stream<Path> walk = Files.walk(Paths.get("./generatedswaggersubfiles"))) {
                walk.forEach(path -> {
                    if (path.toFile().isFile()) {
                        try {
                            String firstGeneratedContent = new String(Files.readAllBytes(path));
                            filesAndContent.put(path.toString(), firstGeneratedContent);
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
                });

            } catch (IOException e) {
                e.printStackTrace();
            }

            // Iterate Over the generated Files And Replace References in them and write the
            // output into another folder
            try (Stream<Path> walk = Files.walk(Paths.get("./generatedswaggersubfiles"))) {

                walk.forEach(path -> {
                    if (path.toFile().isFile()) {
                        try {
                            // TODO: The file could be read directly with the mapper but order could lost. Check later.
                            String firstGeneratedContent = FileUtils.readFileToString(path.toFile());
                            JsonNode changedJsonObject = iterateOverGeneratedFilesAndReplaceReferences(Yaml.mapper().readTree(firstGeneratedContent), path.toString());

                            String fileNameWithOutExt = FilenameUtils.removeExtension(path.getFileName().toString());
                            File f = new File("./generatedswaggermainfiles", fileNameWithOutExt + "Model.json");
                            FileUtils.writeStringToFile(f, changedJsonObject.toString());

                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
                });

            } catch (IOException e) {
                e.printStackTrace();
            }

            // generate the model and view schema for JSON Forms

            try (Stream<Path> walk = Files.walk(Paths.get("./generatedswaggermainfiles"))) {

                walk.forEach(path -> {
                    if (path.toFile().isFile()) {
                        try {
                            String firstGeneratedContent = FileUtils.readFileToString(path.toFile());
                            JsonNode originalJsonObject = Yaml.mapper().readTree(firstGeneratedContent);
                            if (originalJsonObject.has("properties")) {
                                ObjectNode changedJsonObject = generateUISchema((ObjectNode) originalJsonObject.get("properties"), path.toString());
                                String fileNameWithOutExt = FilenameUtils
                                        .removeExtension(path.getFileName().toString());
                                File f = new File("./generatedswaggermainfiles",
                                        replaceLast(fileNameWithOutExt, "Model", "") + "View.json");
                                FileUtils.writeStringToFile(f, changedJsonObject.toString());
                            }
                        } catch (Exception e) {
                            System.out.println(path.getFileName().toString());
                            e.printStackTrace();
                        }
                    }
                });

            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void iterateOverJSONObject(String tabbing, String objectName, ObjectNode jObject,
                                              boolean keepObjectName, String parent) throws JSONException, IOException {

        // arrays
        if (jObject.has("items") && jObject.get("type").asText().equals("array") &&
                jObject.get("items").has("type") && jObject.get("items").get("type").asText().equals("string")) {

            ObjectNode propertiesObject = Yaml.mapper().createObjectNode();
            propertiesObject.set("value", jObject.get("items"));

            ObjectNode itemsObject = Yaml.mapper().createObjectNode();
            itemsObject.set("properties", propertiesObject);
            itemsObject.put("type", "object");
            itemsObject.put("additionalProperties", false);

            // Update the items property in jObject
            jObject.remove("items");
            jObject.set("items", itemsObject);
        }

        // objects
        if (jObject.has("properties") && jObject.has("type") && jObject.get("type").asText().equals("object")) {
            jObject.put("additionalProperties", false);
        }

        Iterator<String> keys = jObject.fieldNames();
        while (keys.hasNext()) {
            final String key = keys.next();

            if (jObject.get(key).isObject()) {
                iterateOverJSONObject(tabbing + "\t", keepObjectName ? objectName : key, (ObjectNode) jObject.get(key),
                        false, parent);
                if (!keepObjectName) {
                    if (!jObject.get(key).toString().startsWith("{\"$ref\":\"#")) {
                        if (!objectName.equals("items") &&
                                jObject.has("type") && jObject.get("type").asText().equals("object")) {

                            if (!StringUtils.isEmpty(parent)) {
                                File definitionFile = new File("./generatedswaggersubfiles",
                                        parent + "_" + objectName.substring(0, 1).toLowerCase()
                                                + objectName.substring(1, objectName.length()) + ".json");
                                FileUtils.writeStringToFile(definitionFile, jObject.toString());
                            } else {
                                File definitionFile = new File("./generatedswaggersubfiles", objectName + ".json");
                                FileUtils.writeStringToFile(definitionFile, jObject.toString());
                            }
                        }
                    } else if (!StringUtils.isEmpty(parent)) {
                        File file = new File("./generatedswaggersubfiles", (parent != "" ? parent + "_" : "")
                                + key.substring(0, 1).toLowerCase() + key.substring(1, key.length()) + ".json");
                        if (!file.exists()) {
                            FileUtils.writeStringToFile(file, jObject.get(key).toString());
                        }
                    }
                }
            } else if (jObject.get(key).isArray() && key.equals("allOf")) {
                iterateOverJsonArray(tabbing + "\t", objectName, (ArrayNode) jObject.get(key), objectName);
            }
        }
    }

    public static ObjectNode generateUISchema(ObjectNode jObject, String filename) {

        Iterator<String> keys = jObject.fieldNames();
        ArrayNode elementsArray = Yaml.mapper().createArrayNode();
        while (keys.hasNext()) {
            final String key = keys.next();

            ObjectNode schemaItem = Yaml.mapper().createObjectNode();
            schemaItem.put("type", "Control");
            schemaItem.put("label", capitaliseFirstLetter(splitCamelCase(key)));
            schemaItem.put("scope", "#/properties/" + key);

            elementsArray.add(schemaItem);
        }

        ObjectNode schema = Yaml.mapper().createObjectNode();
        schema.put("type", "VerticalLayout");
        schema.set("elements", elementsArray);
        return schema;
    }

    private static JsonNode iterateOverGeneratedFilesAndReplaceReferences(JsonNode jObject, String filename) throws IOException {

        Iterator<String> keys = jObject.fieldNames();
        ObjectNode editedOne = jObject.deepCopy();

        while (keys.hasNext()) {
            final String key = keys.next();

            if (jObject.get(key).isObject()) {
                if (jObject.get(key).has("$ref")) {
                    String ref = jObject.get(key).get("$ref").asText();
                    String replacerFileName = ".\\generatedswaggersubfiles\\"
                            + ref.split("/")[ref.split("/").length - 1] + ".json";
                    String contents = filesAndContent.get(replacerFileName);
                    JsonNode replacerJObject = Yaml.mapper().readTree(contents);
                    editedOne.remove(key);
                    editedOne.set(key, replacerJObject);
                }
                JsonNode subJObject = editedOne.get(key);
                subJObject = iterateOverGeneratedFilesAndReplaceReferences(subJObject, filename);
                editedOne.set(key, subJObject);
            } else if (key.equals("$ref")) {
                System.out.println(jObject);
                String ref = jObject.get(key).asText();
                String replacerFileName = ".\\generatedswaggersubfiles\\" + ref.split("/")[ref.split("/").length - 1]
                        + ".json";
                String contents = filesAndContent.get(replacerFileName);
                JsonNode replacerJObject = Yaml.mapper().readTree(contents);
                replacerJObject = iterateOverGeneratedFilesAndReplaceReferences(replacerJObject, filename);
                editedOne = (ObjectNode) replacerJObject;
            }
        }

        return editedOne;
    }

    private static void iterateOverJsonArray(String tabbing, String objectName, ArrayNode jArray, String parent) {
        Iterator<JsonNode> elements = jArray.elements();
        while (elements.hasNext()) {
            ObjectNode currentObject = (ObjectNode) elements.next();
            if (currentObject.isObject()) {
                try {
                    iterateOverJSONObject(tabbing, objectName, currentObject, true, parent);
                } catch (JSONException | IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    static String splitCamelCase(String s) {
        return s.replaceAll(String.format("%s|%s|%s", "(?<=[A-Z])(?=[A-Z][a-z])", "(?<=[^A-Z])(?=[A-Z])",
                "(?<=[A-Za-z])(?=[^A-Za-z])"), " ");
    }

    static String capitaliseFirstLetter(String name) {
        return name.substring(0, 1).toUpperCase() + name.substring(1);
    }

    public static String replaceLast(String text, String regex, String replacement) {
        return text.replaceFirst("(?s)(.*)" + regex, "$1" + replacement);
    }
}
