namespace WarehouseController;

using CommonAssetController;

public class WarehouseController : IAssetController
{
    public Task SendCommand(string command, string[] args)
    {
        throw new NotImplementedException();
    }

    Task<bool> IAssetController.Connect()
    {
        throw new NotImplementedException();
    }

    Task<bool> IAssetController.Disconnect()
    {
        throw new NotImplementedException();
    }

    Task<string> IAssetController.ReadStatus()
    {
        throw new NotImplementedException();
    }
}
