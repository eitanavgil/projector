import {KalturaClient, KalturaClientException, KalturaAPIException} from "kaltura-typescript-client";

export default class Api {

    public client: KalturaClient;
    public ks?:string;

    constructor() {
        this.client = new KalturaClient();
        this.client.setOptions({
            clientTag: "projector",
            endpointUrl: "https://cdnapisec.kaltura.com/api_v3"
        });
    }


    public setKs = (ks: string) => {
        ks = ks;
        this.client.setDefaultRequestOptions({
            ks: ks
        });
    }
}
