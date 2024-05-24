use dotenv::dotenv;
use route::create_router;
use config::Config;
use mongodb::{options::ClientOptions, Client};
use std::sync::Arc;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

pub struct AppState {
    db: Client,
    config: Config,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let config = Config::init();

    // Set up MongoDB client options
    let client_options = match ClientOptions::parse(&config.database_url).await {
        Ok(options) => options,
        Err(err) => {
            println!("🔥 Failed to parse MongoDB connection string: {:?}", err);
            std::process::exit(1);
        }
    };

    // Connect to MongoDB
    let client = match Client::with_options(client_options) {
        Ok(client) => {
            println!("✅ Connection to MongoDB is successful!");
            client
        }
        Err(err) => {
            println!("🔥 Failed to connect to MongoDB: {:?}", err);
            std::process::exit(1);
        }
    };

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse().unwrap())
        .allow_methods(vec!["GET", "POST", "PATCH", "DELETE"])
        .allow_credentials(true)
        .allow_headers(vec![
            AUTHORIZATION.as_str(),
            ACCEPT.as_str(),
            CONTENT_TYPE.as_str(),
        ]);

    let app = create_router(Arc::new(AppState {
        db: client.clone(),
        config: config.clone(),
    }))
    .layer(cors);

    println!("🚀 Server started successfully");
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::Server::from_tcp(listener)
        .unwrap()
        .serve(app.into_make_service())
        .await
        .unwrap();
}

