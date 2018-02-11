package com.nathan;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import static java.lang.System.currentTimeMillis;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;

@WebServlet(urlPatterns = "/api/favorites/*")
public class GiphyServlet extends HttpServlet {

    @Resource(lookup = "jdbc/giphy")
    private DataSource connPool;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getPathInfo().substring(1);

        try (Connection conn = connPool.getConnection()) {

            PreparedStatement ps = conn.prepareStatement("select GIPHY_ID from IMAGE where USERNAME = ?");
            ps.setString(1, username);
            ResultSet resultSet = ps.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (resultSet.next()) {
                builder.add(resultSet.getString(1));
            }
            JsonArray ids = builder.build();

            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType(MediaType.APPLICATION_JSON);
            try (PrintWriter pw = response.getWriter()) {
                pw.println(ids.toString());
            }

        } catch (SQLException ex) {
            log(ex.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getPathInfo().substring(1);

        StringBuilder jb = new StringBuilder();
        String line;
        try {
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                jb = jb.append(line);
            }
        } catch (IOException e) {
            /*report an error*/
        }

        JsonObject jsonObject = Json.createReader(new StringReader(jb.toString())).readObject();

        String giphyId = jsonObject.getString("giphyId");
        log(giphyId);

        try (Connection conn = connPool.getConnection()) {
            //Delete if existed
            PreparedStatement ps1 = conn.prepareStatement(
                    "delete from IMAGE where USERNAME = ? and GIPHY_ID = ?");
            ps1.setString(1, username);
            ps1.setString(2, giphyId);
            ps1.executeUpdate();

            PreparedStatement ps2 = conn.prepareStatement(
                    "insert into IMAGE (USERNAME, GIPHY_ID, TIME_STAMP) values (?, ?, ?)");
            ps2.setString(1, username);
            ps2.setString(2, giphyId);
            ps2.setLong(3, currentTimeMillis());
            
            int count = ps2.executeUpdate();
            if (count < 1) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            } else {
                response.setStatus(HttpServletResponse.SC_OK);
            }
        } catch (SQLException ex) {
            log(ex.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String[] data = request.getPathInfo().split("/");
        String username = data[1];
        String giphyId = data[2];

        try (Connection conn = connPool.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                    "delete from IMAGE where USERNAME = ? and GIPHY_ID = ?");
            ps.setString(1, username);
            ps.setString(2, giphyId);
            int count = ps.executeUpdate();
            if (count < 1) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            } else {
                response.setStatus(HttpServletResponse.SC_OK);
            }
        } catch (SQLException ex) {
            log(ex.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

    }

}
