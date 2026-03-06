namespace ProductionSystem
{
    using CommonAssetController;
    using AssemblyLineController;
    using AGVController;
    internal class Program
    {
        static async Task Main(string[] args)
        {
            IAssetController agvController = new AGVController();
            IAssetController asmController = new AssemblyLineController();

            string status = await agvController.ReadStatus();
            asmController.Connect();
            
            Console.WriteLine(status);
            asmController.SendCommand("123");
            Console.ReadLine();
        }
    }
}
