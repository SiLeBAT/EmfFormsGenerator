package de.bund.bfr.knime.fsklab.nodeengine.java2node;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.jws.soap.SOAPBinding;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mortbay.util.ajax.JSON;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;

public class Swagger2JSONFormsBridge {
	static Map<String, String> filesAndContent = new Hashtable<String, String>();

	public static void main(String[] args) {

		File jsonFile = new File("./swagger.json");

		try {
			FileUtils.cleanDirectory(new File("./generatedswaggersubfiles"));
			FileUtils.cleanDirectory(new File("./generatedswaggermainfiles"));
			String contents = new String(Files.readAllBytes(jsonFile.toPath()));
			JSONObject jObject = new JSONObject(contents).getJSONObject("definitions");
			// First step to extract JSON Object into Files
			iteratOverJSONObject("", "Root", jObject, false, "");

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
							String firstGeneratedContent = new String(Files.readAllBytes(path));
							JSONObject changedJSONObject = iteratOverGeneratedFilesAndReplaceReferences(
									new JSONObject(firstGeneratedContent), path.toString());
							// System.out.println(path.getFileName().toString());

							String fileNameWithOutExt = FilenameUtils.removeExtension(path.getFileName().toString());
							File f = new File("./generatedswaggermainfiles", fileNameWithOutExt + "Model.json");
							saveObjectDefintion(changedJSONObject, f);

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
							String firstGeneratedContent = new String(Files.readAllBytes(path));
							System.out.println(path.getFileName().toString());
							JSONObject originalJSONObject = new JSONObject(firstGeneratedContent);
							if (originalJSONObject.has("properties")) {
								JSONObject changedJSONObject = generateUISchema(
										originalJSONObject.getJSONObject("properties"), path.toString());
								String fileNameWithOutExt = FilenameUtils
										.removeExtension(path.getFileName().toString());
								File f = new File("./generatedswaggermainfiles",
										replaceLast(fileNameWithOutExt, "Model", "") + "View.json");
								saveObjectDefintion(changedJSONObject, f);
							}
						} catch (Exception e) {
							System.out.println(path.getFileName().toString());
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				});

			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static void iteratOverJSONObject(String tabbing, String objectName, JSONObject jObject,
			boolean keepObjectName, String parent) throws JSONException, IOException {
		if (jObject.has("items") && ((String) jObject.get("type")).equals("array")
				&& ((JSONObject) jObject.get("items")).has("type")
				&& ((JSONObject) jObject.get("items")).get("type").equals("string")) {
			JSONObject propertiesObject = new JSONObject();
			propertiesObject.put("value", jObject.get("items"));
			jObject.remove("items");
			JSONObject itemsObject = new JSONObject();
			itemsObject.put("properties", propertiesObject);
			itemsObject.put("type", "object");
			itemsObject.put("additionalProperties", false);
			jObject.put("items", itemsObject);
			// System.out.println(jObject);
		}
		if (jObject.has("properties") && jObject.has("type") && ((String) jObject.get("type")).equals("object")) {
			jObject.put("additionalProperties", false);
		}

		Iterator<String> keys = jObject.keys();
		while (keys.hasNext()) {
			String key = keys.next();
			// System.out.println(tabbing + objectName + " has a key " + key);

			if (jObject.get(key) instanceof JSONObject) {
				iteratOverJSONObject(tabbing + "\t", keepObjectName ? objectName : key, jObject.getJSONObject(key),
						false, parent);
				if (keepObjectName) {
					// saveObjectDefintion(jObject.getJSONObject(key),
					// new File("./generatedswaggermainfiles", objectName + ".json"));
				} else {
					if (!jObject.getJSONObject(key).toString().startsWith("{\"$ref\":\"#")) {
						if (!objectName.equals("items") && jObject.has("type")
								&& jObject.get("type").equals("object")) {

							if (!StringUtils.isEmpty(parent)) {
								saveObjectDefintion(jObject,
										new File("./generatedswaggersubfiles",
												parent + "_" + objectName.substring(0, 1).toLowerCase()
														+ objectName.substring(1, objectName.length()) + ".json"));

							} else {
								saveObjectDefintion(jObject,
										new File("./generatedswaggersubfiles", objectName + ".json"));
							}

						}
					} else {
						if (!StringUtils.isEmpty(parent)) {
							File file = new File("./generatedswaggersubfiles", (parent != "" ? parent + "_" : "")
									+ key.substring(0, 1).toLowerCase() + key.substring(1, key.length()) + ".json");
							if (!file.exists()) {
								saveObjectDefintion(jObject.getJSONObject(key), file);
							}
						}

					}
				}
			} else if (jObject.get(key) instanceof JSONArray && key.equals("allOf")) {
				iteratOverJSONArray(tabbing + "\t", objectName, jObject.getJSONArray(key), objectName);
			}
		}

	}

	public static JSONObject generateUISchema(JSONObject jObject, String fileName) throws JSONException, IOException {
		Iterator<String> keys = jObject.keys();
		JSONObject JSONUISchema = new JSONObject();
		JSONUISchema.put("type", "VerticalLayout");
		JSONArray elementsArray = new JSONArray();
		while (keys.hasNext()) {
			String key = keys.next();
			// System.out.println(fileName + " has a key " + key);
			JSONObject JSONUISchemaItem = new JSONObject();
			JSONUISchemaItem.put("type", "Control");
			JSONUISchemaItem.put("label", capitaliseFirstLetter(splitCamelCase(key)));
			JSONUISchemaItem.put("scope", "#/properties/" + key);
			elementsArray.put(JSONUISchemaItem);
		}
		JSONUISchema.put("elements", elementsArray);
		return JSONUISchema;
	}

	public static JSONObject iteratOverGeneratedFilesAndReplaceReferences(JSONObject jObject, String fileName)
			throws JSONException, IOException {
		Iterator<String> keys = jObject.keys();
		JSONObject editedOne = new JSONObject(jObject, JSONObject.getNames(jObject));

		while (keys.hasNext()) {
			String key = keys.next();

			if (jObject.get(key) instanceof JSONObject) {
				if (((JSONObject) jObject.get(key)).has("$ref")) {
					// System.out.println(fileName + " " + ((JSONObject)
					// jObject.get(key)).get("$ref"));
					String ref = (String) ((JSONObject) jObject.get(key)).get("$ref");
					String replacerFileName = ".\\generatedswaggersubfiles\\"
							+ ref.split("/")[ref.split("/").length - 1] + ".json";
					String contents = filesAndContent.get(replacerFileName);
					JSONObject replacerJObject = new JSONObject(contents);
					editedOne.remove(key);
					editedOne.put(key, replacerJObject);
				}
				JSONObject subJObject = editedOne.getJSONObject(key);
				subJObject = iteratOverGeneratedFilesAndReplaceReferences(subJObject, fileName);
				editedOne.put(key, subJObject);
			} else if (key.equals("$ref")) {
				System.out.println(jObject);
				String ref = (String) jObject.get(key);
				String replacerFileName = ".\\generatedswaggersubfiles\\" + ref.split("/")[ref.split("/").length - 1]
						+ ".json";
				String contents = filesAndContent.get(replacerFileName);
				JSONObject replacerJObject = new JSONObject(contents);
				replacerJObject = iteratOverGeneratedFilesAndReplaceReferences(replacerJObject, fileName);
				editedOne = replacerJObject;
			}
		}
		return editedOne;
	}

	public static void iteratOverJSONArray(String tabbing, String objectName, JSONArray jArray, String parent) {
		jArray.forEach(item -> {
			if (item instanceof JSONObject) {
				JSONObject currentJSonObject = (JSONObject) item;
				try {
					iteratOverJSONObject(tabbing, objectName, currentJSonObject, true, parent);
				} catch (JSONException | IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
	}

	public static void saveObjectDefintion(JSONObject jsonDefinition, File output) throws IOException {
		FileWriter fileWritter = new FileWriter(output.getPath(), false);
		BufferedWriter bufferWritter = new BufferedWriter(fileWritter);
		bufferWritter.write(jsonDefinition.toString());
		bufferWritter.close();
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
