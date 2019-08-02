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
		Swagger2JSONFormsBridge.main(args);
		LOGGER.setLevel(Level.INFO);
		String finaleOutput = "tmp/mininodeserver/";
		final NodeJS nodeJS = NodeJS.createNodeJS();

		File nodeScript = new File(finaleOutput + "server.js");

		nodeJS.exec(nodeScript);

		while (nodeJS.isRunning()) {
			nodeJS.handleMessage();
		}
		LOGGER.info("Swagger views are generated");

		File inFile = new File(
				"../FSK-Lab/de.bund.bfr.knime.fsklab.nodes/js-src/de/bund/bfr/knime/fsklab/nodes/joiner/emfbundle/bundle.js");
		String content = IOUtils.toString(new FileInputStream(inFile), "UTF8");
		String dar = content.replaceAll(
				Pattern.quote(
						"if (typeof console !== 'undefined') {\n" + "        console.error(message);\n" + "      }"),
				"");
		IOUtils.write(dar, new FileOutputStream(inFile), "UTF8");
		nodeJS.release();
		
		
	}

	

}
