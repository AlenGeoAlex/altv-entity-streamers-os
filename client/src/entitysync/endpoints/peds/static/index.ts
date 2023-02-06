import {IEntitySyncEndpoint} from "../../../interfaces";
import {Marker} from "../../markers/marker";
import {IPed, Ped} from "./ped";
import * as alt from "alt-client";
import {fillObjectPartially} from "../../../../utils";

export class EntitySyncPedEndpoint implements IEntitySyncEndpoint
{

    private readonly entities : Map<number, IPed>;

    constructor( ) {
        this.entities = new Map();
    }

    onRemove(entityId: number) {
        if( !this.entities.has( entityId ) )
            return;

        const entity = this.entities.get( entityId );
        entity.destroy();
        this.entities.delete( entityId );
    }

    onStreamIn(entityId: number, entityData: any) {
        let entity = this.entities.get( entityId );

        if( entity ) {
            fillObjectPartially( entity, entityData );
        }
        else {
            entity = new Ped( entityData );
            entity.create();
        }

        this.entities.set( entityId, entity );
    }

    onStreamOut(entityId: number) {
        if( !this.entities.has( entityId ) )
            return;

        const entity = this.entities.get( entityId );
        if(entity)
            entity.destroy();
    }

    onUpdateData(entityId: number, data: any) {
        if( !this.entities.has( entityId ) )
            return;

        let entity = this.entities.get( entityId );
        fillObjectPartially( entity, data );
        entity.update()
    }

    onUpdatePosition(entityId: number, position: alt.Vector3) {
        if( !this.entities.has( entityId ) )
            return;

        const entity = this.entities.get( entityId );
        entity.position = position;
        entity.update();
    }

}