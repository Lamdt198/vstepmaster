using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VstepBackend.Data;
using VstepBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Support dynamic port for Cloud deployments (Render, Railway, Docker, etc.)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// 1. Add Services to the container.
builder.Services.AddControllers();

// 2. EF Core with SQLite (portable, no install required)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=vstep.db"));

// 3. Register Domain Services (Adapter Pattern)
builder.Services.AddScoped<IAiService, VstepAiService>();

// 4. CORS: Allow Frontend connections
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// 5. Swagger OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Auto-seed Database on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DbInitializer.Initialize(db);
}

// 6. Configure HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "VSTEP Master API v1");
    c.RoutePrefix = "swagger"; // Available at /swagger
});

app.UseCors("AllowAllOrigins");

app.UseRouting();

app.MapControllers();

// Root route welcome
app.MapGet("/", () => Results.Ok(new
{
    status = "running",
    application = "VSTEP Master Enterprise Backend API (C# .NET 10)",
    swagger = "/swagger",
    database = "SQLite 3NF Normalized",
    architecture = "Clean Architecture with GoF Design Patterns"
}));

app.Run();
