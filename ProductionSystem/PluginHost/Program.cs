namespace ProductionSystem
{
    using Common.Util;
    using CommonAssetController;
    using CommonProductionHandler;

    public class Program
    {
        public static void Main()
        {
            var controllers = ServiceLocator.Instance.LocateAll<IAssetController>();
            Console.WriteLine($"{controllers.Count}");
        }
    }
}
