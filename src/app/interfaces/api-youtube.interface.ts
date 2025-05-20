export interface YoutubeResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    items: Item[];
    pageInfo: PageInfo;
}

export interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Video;
}

export interface Video {
    id: number;
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: ResourceID;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
}

export interface YoutubeApiResponse {
    yt_code: number;
    message: string;
    data: Video[];
    app_code: string;
}

export interface ResourceID {
    kind: string;
    videoId: string;
}

export interface Thumbnails {
    default: Default;
    medium: Default;
    high: Default;
    standard?: Default;
    maxres?: Default;
}

export interface Default {
    url: string;
    width: number;
    height: number;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}