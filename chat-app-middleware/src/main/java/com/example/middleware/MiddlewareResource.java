package com.example.middleware;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

@Path("/middleware")
public class MiddlewareResource {

    private static final String SPRING_BOOT_URL = "http://localhost:8081/api"; // Spring Boot URL

    @POST
    @Path("/sendMessage")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendMessage(String jsonRequest) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(SPRING_BOOT_URL + "/sendMessage");
            httpPost.setHeader("Content-Type", "application/json");
            httpPost.setEntity(new StringEntity(jsonRequest));

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                HttpEntity entity = response.getEntity();
                String responseBody = EntityUtils.toString(entity);
                return Response.status(response.getStatusLine().getStatusCode()).entity(responseBody).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error forwarding request").build();
        }
    }

    @GET
    @Path("/getMessages")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMessages(
            @QueryParam("user_id") int userId,
            @QueryParam("receiver_id") int receiverId
    ) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            String url = SPRING_BOOT_URL + "/getMessages?user_id=" + userId + "&receiver_id=" + receiverId;
            HttpGet httpGet = new HttpGet(url);

            try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                HttpEntity entity = response.getEntity();
                String responseBody = EntityUtils.toString(entity);
                return Response.status(response.getStatusLine().getStatusCode()).entity(responseBody).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error forwarding request").build();
        }
    }
}