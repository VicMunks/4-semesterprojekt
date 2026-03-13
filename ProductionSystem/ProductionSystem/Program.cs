namespace ProductionSystem
{
    using CommonAssetController;

    internal class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("started");
            var controllers = ServiceLocator.Instance.LocateAll<IAssetController>();
            Console.WriteLine($"{controllers.Count}");
        }
    }
}
