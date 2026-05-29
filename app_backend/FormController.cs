using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using appbackend.Models;
using appbackend.References;

// Controller class which derives from Controller base. This is how data is passed to and from the angular frontend.
namespace appbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase
    {
        // Set our file path to generate in the root of the project. Will show up as a singular Json file.
        private readonly string _filePath = "submissions.json";

        // Function to load the existing submissions from the JSON file.
        // If the file doesn't exist, we return an empty list.
        private List<FormSubObj> LoadSubmissions()
        {
            if (System.IO.File.Exists(_filePath))
            {
                var existing = System.IO.File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<FormSubObj>>(existing, new JsonSerializerOptions
                {
                    Converters = { new JsonStringEnumConverter() }
                }) ?? new List<FormSubObj>();
            }

            return new List<FormSubObj>();
        }


        // Using post method to receive data from the Angular frontend and save it to a JSON file.
        [HttpPost]
        public IActionResult Submit([FromBody] FormSubObj submission)
        {
            // Load the existing submissions from file (if it exists)
            List<FormSubObj> submissions = LoadSubmissions();

            // Add our new submission
            submission.Id = submissions.Count + 1; // Simple ID generation based on count. Will be used for sorting later on.
            submissions.Add(submission);

            //Save the updated list back to the file as JSON
            var json = JsonSerializer.Serialize(submissions, new JsonSerializerOptions
            {
                WriteIndented = true,
                Converters = { new JsonStringEnumConverter() } // This will convert our enum to a string in the JSON file for better readability.
            });
            System.IO.File.WriteAllText(_filePath, json);

            return Ok(new { message = "Submission received and saved." });
        }

        // Attempting to use a GET method to send data to the frontend.
        [HttpGet("Resources")]
        public IActionResult GetData()
        {
            // Get the enums and send to the frontend. 
            // start with a list of strings and convert the enum values.
            // Never actually worked with this before, but its pretty cool.
            // Casts the values into IssueType, loops from end to end, converts to string, and then makes a list out of it.
            var issueTypes = Enum.GetValues(typeof(IssueType))
                .Cast<IssueType>()
                .Select(e => e.ToString())
                .ToList();
            
            return Ok(issueTypes);
        }

        [HttpGet("Submissions")]
        public IActionResult GetSubmissions()
        {
            // Same situation as the post method.
            List<FormSubObj> submissions = LoadSubmissions();

            // Sort the submissions by ID in descending order (newest first)
            var sortedSubmissions = submissions.OrderByDescending(sub => sub.Id).ToList();

            return Ok(sortedSubmissions);
        }
    }


}