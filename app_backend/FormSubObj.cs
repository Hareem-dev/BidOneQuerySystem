namespace appbackend.Models
{
    // Header
    // Class object which holds all the data to be populated in the form.
    // Takes data from Angular Frontend

    public class FormSubObj
    {   
        // Getter setters used to populate the variables
        public int Id { get; set; } = 0;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}