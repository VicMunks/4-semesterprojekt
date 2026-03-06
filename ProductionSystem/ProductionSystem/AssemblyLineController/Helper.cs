using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace AssemblyLineController;

static class ObjectExtensions
{
    static readonly JsonSerializerOptions SerializerOptions = new()
    {
        WriteIndented = true
    };

    public static TObject DumpToConsole<TObject>(this TObject @object)
    {
        var output = "NULL";
        if (@object != null)
        {
            try
            {
                output = JsonSerializer.Serialize(@object, SerializerOptions);
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("ref struct") || ex.Message.Contains("ReadOnlySpan"))
            {
                output = @object.ToString();
            }
        }

        Console.WriteLine($"[{@object?.GetType().Name}]:\r\n{output}");
        return @object;
    }
}