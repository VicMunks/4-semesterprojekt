using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

public sealed class ServiceLocator
{
    public static ServiceLocator Instance { get; } = new ServiceLocator();

    private readonly List<Assembly> _pluginAssemblies = new();
    private readonly Dictionary<Type, List<object>> _cache = new();
    private readonly Dictionary<Type, List<object>> _serviceRegistry = new();

    private ServiceLocator()
    {
        var pluginsDir = Path.Combine(AppContext.BaseDirectory, "Plugins");
        if (!Directory.Exists(pluginsDir))
        {
            Console.WriteLine("Could not find Plugins folder");
            return;
        }

        foreach (var dll in Directory.EnumerateFiles(pluginsDir, "*.dll"))
        {
            var asm = Assembly.LoadFrom(dll);
            _pluginAssemblies.Add(asm);
            Console.WriteLine($"loaded: {asm.FullName}");

            if ( _serviceRegistry.TryGetValue( asm.GetType() ) )
            {
                _serviceRegistry[asm.GetType()].Add(asm.)
            }

        }
    }

    public IReadOnlyList<T> LocateAll<T>() where T : class
    {
        var serviceType = typeof(T);

        if (_cache.TryGetValue(serviceType, out var cached))
            return cached.Cast<T>().ToList();

        var services = new List<T>();

        foreach (var asm in _pluginAssemblies.Append(Assembly.GetExecutingAssembly()))
        {
            IEnumerable<Type> candidates;
            try
            {
                candidates = asm.GetTypes();
            }
            catch (ReflectionTypeLoadException ex)
            {
                candidates = ex.Types.Where(t => t != null)!;
            }

            foreach (var t in candidates)
            {
                if (t is null || t.IsAbstract || t.IsInterface)
                    continue;

                if (!serviceType.IsAssignableFrom(t))
                    continue;

                // requires public parameterless ctor (or add your own factory/DI here)
                if (Activator.CreateInstance(t) is T instance)
                {
                    services.Add(instance);
                }
            }
        }

        _cache[serviceType] = services.Cast<object>().ToList();
        return services;
    }
}