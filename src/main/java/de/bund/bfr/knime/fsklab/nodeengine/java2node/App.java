package de.bund.bfr.knime.fsklab.nodeengine.java2node;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.eclipsesource.v8.NodeJS;

public class App {
	static Logger LOGGER = Logger.getLogger(NodePackagesInstaller.class.getName());
	static Properties configFile;
	static Properties props = new Properties();

	public static void main(String[] args) throws IOException {
		LOGGER.setLevel(Level.INFO);

		String generatedViewsLocation = "";
		String ecoreFileLocation = "";
		String finaleOutput = "";
		try {
			File configFile = new File("./config.properties");
			FileReader reader = new FileReader(configFile);

			props.load(reader);
			String originalGeneratedViewsLocation = props.getProperty("originalGeneratedViewsLocation");
			generatedViewsLocation = props.getProperty("generatedViewsLocation");
			finaleOutput = props.getProperty("finaleOutput");
			copyFolder(new File(originalGeneratedViewsLocation), new File(generatedViewsLocation));
			ecoreFileLocation = props.getProperty("ecoreFileLocation");
			reader.close();
		} catch (FileNotFoundException ex) {
			ex.printStackTrace();
		} catch (IOException ex) {
			ex.printStackTrace();
		}

		List<String> toBeFixed = Arrays.asList(props.getProperty("filesToBeFixed").split(",")).stream()
				.map(String::trim).collect(Collectors.toList());

		for (String toBeFixedFileName : toBeFixed) {
			String filePath = generatedViewsLocation + toBeFixedFileName;
			FileInputStream fisView = new FileInputStream(new File(filePath + "View.json"));
			FileInputStream fisModel = new FileInputStream(new File(filePath + "Model.json"));
			// compare the model and the view of each class(like general information) for
			// missing properties in the model.and try to fix that by adding the missing
			// sub-model part
			// like creator in generalInformation which is an exception of other cases
			// (which in them we don't read the model from other file but from the view file
			// it self).
			String model = IOUtils.toString(fisModel, "UTF-8");
			JSONObject modelObject = new JSONObject(model);
			JSONObject properties = (JSONObject) modelObject.get("properties");
			LOGGER.info(modelObject.toString());

			String view = IOUtils.toString(fisView, "UTF-8");
			JSONObject viewObject = new JSONObject(view);
			JSONArray elements = (JSONArray) viewObject.get("elements");
			for (Object element : elements.toList()) {
				java.util.HashMap elementMap = (java.util.HashMap) element;
				// scope is the field where is used to annotate the mapping property
				String[] propertyMapping = ((String) elementMap.get("scope")).split("/");
				String fieldName = propertyMapping[propertyMapping.length - 1];
				// compare the view and the model elements and create the missing ones in the
				// view if it doesn't contains them

				if (!properties.keySet().contains(fieldName)) {
					JSONObject missingValue = new JSONObject();
					if (propertyMapping[propertyMapping.length - 1].equals("creators")) {
						FileInputStream constactModel = new FileInputStream(
								new File(generatedViewsLocation + "/ContactModel.json"));
						String contactjsonStrModel = IOUtils.toString(constactModel, "UTF-8");

						missingValue.put("type", "array");
						missingValue.put("items", new JSONObject(contactjsonStrModel));
						properties.put(propertyMapping[propertyMapping.length - 1], missingValue);
						OutputStream output = new FileOutputStream(
								new File(generatedViewsLocation + "/GeneralInformationModel.json"));

						IOUtils.write(modelObject.toString(), output, "UTF-8");
					} else {

						missingValue.put("type", "array");
						missingValue.put("additionalProperties", false);
						JSONObject embededValue = new JSONObject();
						embededValue.put("type", "object");
						JSONObject innerValue = new JSONObject();
						JSONObject mostInnerValue = new JSONObject();
						mostInnerValue.put("type", "string");
						innerValue.put("value", mostInnerValue);
						embededValue.put("properties", innerValue);
						missingValue.put("items", embededValue);
						properties.put(propertyMapping[propertyMapping.length - 1], missingValue);
					}
				}
			}

			LOGGER.info(modelObject.toString());
			fisModel.close();
			fisView.close();
			OutputStream outputsource = new FileOutputStream(new File(filePath + "Model.json"));
			OutputStream outputtarget = new FileOutputStream(new File(finaleOutput + toBeFixedFileName + "Model.json"));

			IOUtils.write(modelObject.toString(), outputsource, "UTF-8");
			IOUtils.write(modelObject.toString(), outputtarget, "UTF-8");

		}
		// replace the enums in the some files with human readable arrays like
		// publication types
		List<String> keyNameOfElementToBeFixed = Arrays
				.asList(props.getProperty("keyNameOfElementToBeFixed").split(",")).stream().map(String::trim)
				.collect(Collectors.toList());
		List<String> modelJSONFilesToReplaceIn = Arrays
				.asList(props.getProperty("modelJSONFilesToReplaceEnumIn").split(",")).stream().map(String::trim)
				.collect(Collectors.toList());
		List<String> enumsToReplace = Arrays.asList(props.getProperty("enumsToReplace").split(",")).stream()
				.map(String::trim).collect(Collectors.toList());
		List<String> holderElement = Arrays.asList(props.getProperty("holderElement").split(",")).stream()
				.map(String::trim).collect(Collectors.toList());
		String[] arrayHolderLevel = { null, null, "items", "items" };

		for (int index = 0; index < keyNameOfElementToBeFixed.size(); index++) {
			String fileToReplaceIn = modelJSONFilesToReplaceIn.get(index);
			JSONObject value = new JSONObject();
			FileInputStream fisECORE = new FileInputStream(new File(ecoreFileLocation));
			String jsonECore = IOUtils.toString(fisECORE, "UTF-8");
			LOGGER.info(jsonECore);
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder;
			try {
				builder = factory.newDocumentBuilder();
				Document document = builder.parse(new InputSource(new StringReader(jsonECore)));
				document.getDocumentElement().normalize();
				NodeList nList = document.getElementsByTagName("eClassifiers");
				for (int temp = 0; temp < nList.getLength(); temp++) {
					Node nNode = nList.item(temp);
					if (nNode.getNodeType() == Node.ELEMENT_NODE) {

						Element eElement = (Element) nNode;
						if (eElement.getAttribute("name").equalsIgnoreCase(enumsToReplace.get(index))) {
							NodeList nListx = eElement.getElementsByTagName("eLiterals");

							value.put("type", "string");

							String[] enumArray = new String[nListx.getLength()];
							for (int tempx = 0; tempx < nListx.getLength(); tempx++) {
								Node nNodex = nListx.item(tempx);
								if (nNodex.getNodeType() == Node.ELEMENT_NODE) {
									Element eElementx = (Element) nNodex;

									enumArray[tempx] = eElementx.getAttribute("literal");
								}

							}
							value.put("enum", enumArray);
							LOGGER.info("literal name : " + value.toString());
						}

					}
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

			FileInputStream fisModel = new FileInputStream(
					new File(generatedViewsLocation + fileToReplaceIn + "Model.json"));
			String jsonStrModel = IOUtils.toString(fisModel, "UTF-8");
			JSONObject jsonObjModel = new JSONObject(jsonStrModel);
			if (jsonObjModel.has(holderElement.get(index))) {
				JSONObject arrModel = (JSONObject) jsonObjModel.get(holderElement.get(index));
				arrModel.remove(keyNameOfElementToBeFixed.get(index));
				arrModel.put(keyNameOfElementToBeFixed.get(index), value);
				JSONObject enumy = arrModel.getJSONObject(keyNameOfElementToBeFixed.get(index));

				OutputStream output = new FileOutputStream(new File(finaleOutput + fileToReplaceIn + "Model.json"));

				IOUtils.write(jsonObjModel.toString(), output, "UTF-8");
			} else {
				JSONObject propertiesJSONObject = (JSONObject) jsonObjModel.get("properties");

				JSONObject arrModel = (JSONObject) propertiesJSONObject.get(holderElement.get(index));
				if (arrayHolderLevel[index] != null) {
					arrModel = (JSONObject) arrModel.get(arrayHolderLevel[index]);
					arrModel = (JSONObject) arrModel.get("properties");
					// System.out.println(arrModel.get(toReplaceEnumkeysInJSON[index]));
				}

				arrModel.remove(keyNameOfElementToBeFixed.get(index));
				arrModel.put(keyNameOfElementToBeFixed.get(index), value);
				JSONObject enumy = arrModel.getJSONObject(keyNameOfElementToBeFixed.get(index));

				OutputStream output = new FileOutputStream(new File(finaleOutput + fileToReplaceIn + "Model.json"));

				IOUtils.write(jsonObjModel.toString(), output, "UTF-8");
			}

		}

		final NodeJS nodeJS = NodeJS.createNodeJS();

		// File packagesScript = new File(finaleOutput+"packages.js");
		File nodeScript = new File(finaleOutput + "server.js");

		/*
		 * System.out.println(nodeScript.getAbsolutePath());
		 * nodeJS.exec(packagesScript); while (nodeJS.isRunning()) {
		 * nodeJS.handleMessage(); }
		 */
		nodeJS.exec(nodeScript);

		while (nodeJS.isRunning()) {
			nodeJS.handleMessage();
		}
		LOGGER.info("EMF views are generated");

		File inFile = new File(
				"../FSK-Lab/de.bund.bfr.knime.fsklab.nodes/js-src/de/bund/bfr/knime/fsklab/nodes/joiner/emfbundle/bundle.js");
		String content = IOUtils.toString(new FileInputStream(inFile), "UTF8");
		String contentx = content.replaceAll("var _ = require(\"lodash\");", "var _ = window.lodash;");
		String contentmore = contentx.replaceAll("var punycode = require('punycode');",
				"var punycode  = window.punycode;");
		String dar = contentmore.replaceAll(
				Pattern.quote(
						"if (typeof console !== 'undefined') {\n" + "        console.error(message);\n" + "      }"),
				"");
		IOUtils.write(dar, new FileOutputStream(inFile), "UTF8");
		nodeJS.release();
	}

	public static void copyFolder(File src, File dest) throws IOException {
		try (Stream<Path> stream = Files.walk(src.toPath())) {
			stream.filter(Files::isRegularFile).filter(current -> {
				return current.toString().endsWith(".json");
			}).forEach(sourcePath -> {

				try {
					System.out.println(dest.toPath().toString() + File.separator + sourcePath.getFileName());
					Files.copy(sourcePath,
							new File(dest.toPath().toString() + File.separator + sourcePath.getFileName()).toPath(),
							StandardCopyOption.REPLACE_EXISTING);
				} catch (Exception e) {
					e.printStackTrace();
				}
			});
		}
	}

}
