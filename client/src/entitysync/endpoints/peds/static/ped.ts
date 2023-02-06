import * as alt from 'alt-client';
import * as natives from "natives";
import {fillObjectPartially} from "../../../../utils";
import {asyncModel} from "../../objects/async-models";

export interface IPed {
    pedType : number;
    modelHash : string;
    position : alt.Vector3;
    heading : number;
    isNetwork : boolean;
    bScriptHostPed : boolean;
    freeze : boolean;

    create();
    destroy();
    update();
}

export class Ped implements IPed{

    constructor( data : IPed) {
        fillObjectPartially( this, data );
    }

    bScriptHostPed: boolean;
    heading: number;
    isNetwork: boolean;
    modelHash: string;
    position : alt.Vector3;
    pedType: number;
    handle: number;
    freeze : boolean;

    async create() {
        let hash = alt.hash( this.modelHash );

        await asyncModel.load( hash );
        this.handle = natives.createPed(
            this.pedType,
            hash,
            this.position.x,
            this.position.y,
            this.position.z,
            this.heading,
            this.isNetwork,
            this.bScriptHostPed
        );

        if(this.handle === 0){
            console.log(`Failed to create a ped with hash ${this.modelHash} on location ${this.position.x} ${this.position.y} ${this.position.z}`)
            return;
        }

        natives.freezeEntityPosition(this.handle, this.freeze);
    }

    async update(){
        this.destroy();
        await this.create();
    }

    destroy() {
        if(this.handle === 0)
            return;
    }


}