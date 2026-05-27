var builder = WebApplication.CreateBuilder(args);

// Initializing so that my Angular frontend can talk with this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular default port
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowAngular");
app.MapControllers();

app.Run();
