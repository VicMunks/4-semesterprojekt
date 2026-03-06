namespace AssemblyLineController;

using CommonAssetController;
using MQTTnet;
using MQTTnet.Packets;
using MQTTnet.Protocol;
using System;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


public class AssemblyLineController : IAssetController
{
    private readonly IMqttClient mqttClient;
    private readonly MqttClientOptions mqttClientOptions;
    private readonly MqttClientFactory mqttFactory;
    static readonly JsonSerializerOptions SerializerOptions = new()
    {
        WriteIndented = true
    };

    public AssemblyLineController()
    {
        mqttFactory = new MqttClientFactory();
        mqttClient = mqttFactory.CreateMqttClient();
        mqttClientOptions = new MqttClientOptionsBuilder().WithTcpServer("localhost").Build();

        mqttClient.ApplicationMessageReceivedAsync += e =>
        {
            Console.WriteLine("Received application message.");

            var payloadString = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
            object payloadData;
            
            try
            {
                payloadData = JsonSerializer.Deserialize<JsonElement>(payloadString);
            }
            catch
            {
                payloadData = payloadString;
            }

            var messageInfo = new
            {
                Topic = e.ApplicationMessage.Topic,
                Payload = payloadData,
                QoS = e.ApplicationMessage.QualityOfServiceLevel,
                Retain = e.ApplicationMessage.Retain,
                ContentType = e.ApplicationMessage.ContentType
            };

            messageInfo.DumpToConsole();
            return Task.CompletedTask;
        };
    }

    async Task<bool> IAssetController.Connect()
    {
        var mqttFactory = new MqttClientFactory();
        try
        {
            var response = await mqttClient.ConnectAsync(mqttClientOptions, CancellationToken.None);
            Console.WriteLine("The MQTT client is connected.");
            SubribeToTopics();
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while connecting to the MQTT broker: {ex.Message}");
            return false;
        }
    }

    async Task<bool> IAssetController.Disconnect()
    {
        try
        {
            await mqttClient.DisconnectAsync(new MqttClientDisconnectOptionsBuilder().WithReason(MqttClientDisconnectOptionsReason.NormalDisconnection).Build());
            Console.WriteLine("The MQTT client is disconnected.");
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while disconnecting from the MQTT broker: {ex.Message}");
            return false;
        }
    }

    Task<string> IAssetController.ReadStatus()
    {
        throw new NotImplementedException();
    }

    Task IAssetController.SendCommand(string command = "12345")
    {
        Dictionary<string, string> commandDict = new Dictionary<string, string>()
        {
            { "ProcessID", command }
        };


        var applicationMessage = new MqttApplicationMessageBuilder()
            .WithTopic("emulator/operation")
            .WithPayload("123")
            .Build();
        return Task.CompletedTask;
    }

    async void SubribeToTopics()
    {
        var topicFilter = mqttFactory.CreateTopicFilterBuilder().WithTopic("emulator/status").WithAtLeastOnceQoS();

        var mqttSubscribeOptions = mqttFactory.CreateSubscribeOptionsBuilder().WithTopicFilter(topicFilter).Build();

        var response = await mqttClient.SubscribeAsync(mqttSubscribeOptions, CancellationToken.None);

        Console.WriteLine("MQTT client subscribed to topic.");

        Console.WriteLine(JsonSerializer.Serialize(response, SerializerOptions));

    }
}