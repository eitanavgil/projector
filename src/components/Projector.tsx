import React, { useState, useEffect } from "react";
import { KalturaClient, KalturaClientException, KalturaAPIException } from "kaltura-typescript-client";
import { MediaListAction, KalturaMediaEntryFilter } from "kaltura-typescript-client/api/types";

const Projector: React.FC = () => {
  useEffect(() => {
    const kalturaClient = new KalturaClient();
    kalturaClient.setOptions({
      clientTag: "playkit-js-kaltura-live",
      endpointUrl: "https://cdnapisec.kaltura.com/api_v3"
    });
    kalturaClient.setDefaultRequestOptions({
      ks:
        "NThjYWRkYjE5NjAzNDhkODhlNmFjZmIzOWNiYzg5NjZmNjZlNTMyOHwyNzAxNzsyNzAxNzsxNTcxMDQyMzQ4OzI7MTU3MDk1NTk0OC40NTc1O2VpdGFuLmF2Z2lsQGthbHR1cmEuY29tO2Rpc2FibGVlbnRpdGxlbWVudCxhcHBpZDprbWM7Ow=="
    });
    const filter: KalturaMediaEntryFilter = new KalturaMediaEntryFilter();
    filter.tagsMultiLikeAnd = "projector";

    const request = new MediaListAction({ filter: filter, pager: undefined });
    kalturaClient.request(request).then(
      response => {
        console.log(response);
      },
      error => {
        if (error instanceof KalturaClientException) {
          console.log("network error etc");
        } else if (error instanceof KalturaAPIException) {
          console.log("api exception");
        }
      }
    );
  }, []);
  const [loading, setLoading] = useState(true);

  return <div className="projector">{loading && "Loading"}</div>;
};

export default Projector;
