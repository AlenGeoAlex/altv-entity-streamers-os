using System.Numerics;
using AltV.Net.EntitySync;
using AltV.Streamers;

namespace AltV.Streamers.Peds;

public class PedStreamer
{

    public static StaticPed CreateStaticPed(string modelHash, Vector3 position, float heading,
        int pedType = 1, int dimension = 0, uint streamRange = 50, bool freeze = true)

    {
        StaticPed ped = new StaticPed(position, dimension, streamRange)
        {
            ModelHash = modelHash,
            Heading = heading,
            Freeze = freeze
        };


        AltEntitySync.AddEntity(ped);
        return ped;
    }

}