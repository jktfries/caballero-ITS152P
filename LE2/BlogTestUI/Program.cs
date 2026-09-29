using BlogDataLibrary.Data;
using BlogDataLibrary.Database;
using Microsoft.Extensions.Configuration;

namespace BlogTestUI
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            ISqlDataAccess db = new SqlDataAccess(config);
            SqlData sqlData = new SqlData(db);

            Console.WriteLine("Connection string: " + config.GetConnectionString("SqlDb"));
            Console.WriteLine("Data layer ready: " + sqlData.GetType().Name);
        }
    }
}
