using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Initializing so that my Angular frontend can talk with this API
// The main of the program. 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular default port
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

var app = builder.Build();

app.UseCors("AllowAngular");
app.MapControllers();

app.Run();
