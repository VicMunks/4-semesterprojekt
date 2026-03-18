namespace ProductionSystem
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc.ApplicationParts;
    using Microsoft.Extensions.DependencyInjection;
    using Common.Util;
    using CommonAssetController;

    public class Program
    {
        public static void Main(string[] args)
        {
            var serviceLocator = ServiceLocator.Instance;
            var builder = WebApplication.CreateBuilder(args);
            builder.WebHost.UseUrls("http://localhost:5027");

            var mvcBuilder = builder.Services.AddControllers();
            foreach (var asm in serviceLocator.GetPluginAssemblies())
            {
                mvcBuilder.PartManager.ApplicationParts.Add(new AssemblyPart(asm));
            }

            var app = builder.Build();
            app.MapControllers();

            var controllers = serviceLocator.LocateAll<IAssetController>();
            Console.WriteLine($"Loaded {controllers.Count} asset controllers.");
            Console.WriteLine($"Loaded {serviceLocator.GetPluginAssemblies().Count} plugin assemblies.");

            app.Run();
        }
    }
}
