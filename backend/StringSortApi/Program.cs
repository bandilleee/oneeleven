using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add CORS so frontend can communicate with backend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

// Health check endpoint
app.MapGet("/", () => "String Sort API is running!");

// Main POST endpoint for the webhook
app.MapPost("/api/sort-string", ([FromBody] DataRequest request) =>
{
    // Step 1: Validate input
    if (request?.Data == null || string.IsNullOrEmpty(request.Data))
    {
        return Results.BadRequest(new { error = "Invalid input. Please provide a 'data' field with a string value." });
    }

    // Step 2: Convert string to array of characters
    char[] charArray = request.Data.ToCharArray();

    // Step 3: Sort alphabetically (case-insensitive)
    var sortedArray = charArray
        .OrderBy(c => char.ToLower(c))
        .Select(c => c.ToString())
        .ToArray();

    // Step 4: Return the sorted array as "word"
    return Results.Ok(new { word = sortedArray });
});

// Use PORT environment variable for deployment, fallback to 5152 for local
var port = Environment.GetEnvironmentVariable("PORT") ?? "5152";
app.Run($"http://0.0.0.0:{port}");

// Model class to receive the JSON data
public class DataRequest
{
    public string? Data { get; set; }
}