package com.example.middleware;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class MiddlewareApplication extends Application {
    // This class registers the middleware as a JAX-RS application
}
