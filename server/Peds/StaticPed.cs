
using System.Numerics;
using AltV.Net.EntitySync;
using AltV.Streamers;

namespace AltV.Streamers.Peds;


public class StaticPed : Entity, IEntity
{
    
    private ulong EntityType
    {
        get
        {
            if( !TryGetData( "entityType", out ulong type ) )
                return 999;

            return type;
        }
        set
        {
            // No data changed
            if( EntityType == value )
                return;

            SetData( "entityType", value );
        }
    }
    
    public int PedType
    {
        get
        {
            if( !TryGetData( "pedType", out int type ) )
                return 999;

            return type;
        }
        set
        {
            // No data changed
            if( PedType == value )
                return;

            SetData( "pedType", value );
        }
    }

    public string ModelHash
    {
        get
        {
            if (!TryGetData("modelHash", out string hash))
                return "";

            return hash;
        }
        set
        {
            if(ModelHash == value)
                return;
            
            SetData("modelHash", value);
        }
    }

    public float Heading
    {
        get
        {
            if (!TryGetData("heading", out float heading))
                return default(float);

            return heading;
        }
        set
        {
            if(Heading == value)
                return;
            
            SetData("heading", value);
        }
    }
    
    public bool Freeze
    {
        get
        {
            if (!TryGetData("freeze", out bool freeze))
                return false;

            return freeze;
        }
        set
        {
            if(Freeze == value)
                return;
            
            SetData("freeze", value);
        }
    }

    public StaticPed( Vector3 position, int dimension, uint range) : base(AltStreamers.ENTITY_TYPE_STATIC_PED, position, dimension, range)
    {
    }
    
}