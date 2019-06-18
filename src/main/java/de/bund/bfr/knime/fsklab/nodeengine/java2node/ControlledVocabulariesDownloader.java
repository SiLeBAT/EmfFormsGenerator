package de.bund.bfr.knime.fsklab.nodeengine.java2node;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.IOUtils;
/**
 * This is Application designed to connect to the Controlled Vucabularies google sheet and to procces the the
 * data stored there into arraies to be used afterwards within the generated EMF forms.
 */
public class ControlledVocabulariesDownloader {
	private static final String APPLICATION_NAME = "Google Sheets API Java Quickstart";
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	private static final String CREDENTIALS_FOLDER = "credentials"; // Directory to store user credentials.

	/**
	 * Global instance of the scopes required by this quickstart. If modifying these
	 * scopes, delete your previously saved credentials/ folder.
	 */
	private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY);
	private static final String CLIENT_SECRET_DIR = "client_secret.json";

	/**
	 * Creates an authorized Credential object.
	 * 
	 * @param HTTP_TRANSPORT
	 *            The network HTTP Transport.
	 * @return An authorized Credential object.
	 * @throws IOException
	 *             If there is no client_secret.
	 */
	private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
		// Load client secrets.
		InputStream in = ControlledVocabulariesDownloader.class.getResourceAsStream(CLIENT_SECRET_DIR);
		GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

		// Build flow and trigger user authorization request.
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY,
				clientSecrets, SCOPES)
						.setDataStoreFactory(new FileDataStoreFactory(new java.io.File(CREDENTIALS_FOLDER)))
						.setAccessType("offline").build();
		return new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
	}

	
	public static void main(String... args) throws IOException, GeneralSecurityException {
		// Build a new authorized API client service.
		System.setProperty("https.proxyHost", "webproxy");
		System.setProperty("https.proxyPort", "8080");
		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		final String spreadsheetId = "1NBJpblHCst4UIlMJIfg6Vy--eP9lhWzlVNr6OaRNI-g";
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
				.setApplicationName(APPLICATION_NAME).build();
		Set<String> con_voc = new HashSet<String>();
		{
			final String range = "CONTROLLED VOCABULARIES!A:B";

			ValueRange response = service.spreadsheets().values().get(spreadsheetId, range).execute();
			List<List<Object>> values = response.getValues();
			boolean first = true;
			for (List row : values) {
				if (first)
					first = false;
				else {
					if (((String) row.get(0)).trim().equals("Product-matrix unit")
							|| ((String) row.get(0)).trim().equals("Hazard unit")
							|| ((String) row.get(0)).trim().equals("Lot size unit")) {
						con_voc.add("Parameter unit");
					} else if (((String) row.get(0)).trim().equals("Country of origin")
							|| ((String) row.get(0)).trim().equals("Laboratory country")) {
						con_voc.add("Country");
					} else {
						con_voc.add(((String) row.get(0)).trim());
					}

				}

			}
		}

		Object[] Controlled_Vocabularies = con_voc.toArray();
		String browserCode = "";

		for (int x = 0; x < Controlled_Vocabularies.length; x++) {
			final String range = Controlled_Vocabularies[x] + "!A:B";

			ValueRange response = service.spreadsheets().values().get(spreadsheetId, range).execute();
			String filaAndArrayName = ((String) Controlled_Vocabularies[x]).trim().replaceAll(" ", "_")
					.replaceAll("\\.", "_").replaceAll("-", "_");
			System.out.println(x + " " + filaAndArrayName);
			List<List<Object>> values = response.getValues();
			String arrayValue = "window." + filaAndArrayName + " = [";
			if (values == null || values.isEmpty()) {
				System.out.println("No data found.");
			} else {

				for (List row : values) {
					// Print columns A and E, which correspond to indices 0 and 4.
					try {
						if (((String) row.get(0)).trim() != "" && !((String) row.get(0)).trim().equals("Value")) {
							arrayValue += "\"" + ((String) row.get(0)).replaceAll(",", " ").replaceAll("\\n", " ")
									.replaceAll("\"", "") + "\",";
						}
					} catch (Exception ex) {
						ex.printStackTrace();
					}

				}
				browserCode += "require('./CONTROLLED_VOCABULARIES/" + filaAndArrayName + ".js');\n";
				OutputStream output = new FileOutputStream(
						new File("tmp/mininodeserver/CONTROLLED_VOCABULARIES/" + filaAndArrayName + ".js"));

				IOUtils.write(arrayValue.substring(0, arrayValue.length() - 1).toString() + "]", output, "UTF-8");
			}
		}
		OutputStream output = new FileOutputStream(
				new File("tmp/mininodeserver/CONTROLLED_VOCABULARIES/browserCode.js"));

		IOUtils.write(browserCode, output, "UTF-8");
	}
}