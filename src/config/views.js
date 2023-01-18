import { clusterIcons } from './clusters';

export default {
  resultViews: [
    {
      id: 'horizontalCard',
      title: 'Horizontal cards',
      icon: 'bars',
      render: null,
      isDefault: true,
      factories: {
        view: 'HorizontalCard.Group',
        item: 'HorizontalCardItem',
      },
    },
    {
      id: 'card',
      title: 'Cards',
      icon: 'th',
      render: null,
      isDefault: false,
      factories: {
        view: 'Card.Group',
        item: 'CardItem',
      },
    },
    {
      id: 'compactListing',
      title: 'Compact listing',
      icon: 'th',
      render: null,
      isDefault: false,
      factories: {
        view: 'HorizontalCard.Group',
        item: 'HorizontalCardItem',
      },
    },
  ],

  cardViewParams: {
    urlField: 'about',
    titleField: 'title',
    metatypeField: 'objectProvides',
    descriptionField: 'description',
    tagsField: 'topic',
    issuedField: 'issued',
    enabled: true,
    getThumbnailUrl: 'getGlobalsearchThumbUrl',
    getIconUrl: 'getGlobalsearchIconUrl',
    clusterIcons,
  },

  horizontalCardViewParams: {
    urlField: 'about',
    titleField: 'title',
    metatypeField: 'objectProvides',
    descriptionField: 'description',
    tagsField: 'topic',
    issuedField: 'issued',
    enabled: true,
    getThumbnailUrl: 'getGlobalsearchThumbUrl',
    getIconUrl: 'getGlobalsearchIconUrl',
    clusterIcons,
  },

  compactListingViewParams: {
    urlField: 'about',
    titleField: 'title',
    metatypeField: 'objectProvides',
    descriptionField: 'description',
    tagsField: 'topic',
    issuedField: 'issued',
    enabled: false,
    getThumbnailUrl: 'getGlobalsearchThumbUrl',
    getIconUrl: 'getGlobalsearchIconUrl',
    clusterIcons,
  },

  initialView: {
    factory: 'TilesLandingPage',
    tilesLandingPageParams: {
      maxPerSection: 30,
      // clusterIcons,
      sortField: 'issued.date',
      sortDirection: 'desc',
      sections: [
        {
          id: 'topics',
          title: 'Topics',
          facetField: 'topic',
          sortOn: 'alpha',
        },
        {
          id: 'countries',
          title: 'Countries',
          facetField: 'spatial',
          filterType: 'any:exact',
          sortOn: 'alpha',
          maxPerSection: 100,
          whitelist: [
            'Austria',
            'Belgium',
            'Bulgaria',
            'Croatia',
            'Cyprus',
            'Czechia',
            'Denmark',
            'Estonia',
            'Finland',
            'France',
            'Germany',
            'Greece',
            'Hungary',
            'Iceland',
            'Ireland',
            'Italy',
            'Latvia',
            'Liechtenstein',
            'Lithuania',
            'Luxembourg',
            'Malta',
            'Netherlands',
            'Norway',
            'Poland',
            'Portugal',
            'Romania',
            'Slovakia',
            'Slovenia',
            'Spain',
            'Sweden',
            'Switzerland',
            'Turkey',
            'Albania',
            'Bosnia and Herzegovina',
            'Kosovo',
            'Montenegro',
            'North Macedonia',
            'Serbia',
          ],
          icon: {
            family: 'CountryFlags',
            className: 'facet-option-icon',
          },
        },
        {
          id: 'types',
          title: 'Types',
          facetField: 'objectProvides',
          sortOn: 'alpha',
          icon: {
            family: 'Content types',
          },
        },
        {
          id: 'language',
          title: 'Languages',
          facetField: 'language',
          sortOn: 'custom',
          sortOrder: 'asc',
        },
        {
          id: 'website',
          title: 'Sources',
          facetField: 'cluster_name',
          sortOn: 'count',
          sortOrder: 'desc',
          icon: {
            family: 'Sources',
            className: 'facet-option-icon',
          },
        },
      ],
    },
  },

  listingViewParams: {
    enabled: false,
  },

  tableViewParams: {
    titleField: 'title',
    urlField: 'about',
    enabled: false,
    columns: [
      {
        title: 'Title',
        field: 'title',
      },
      {
        title: 'Description',
        field: 'description',
      },
      {
        title: 'Countries',
        field: 'spatial',
      },
      {
        title: 'Regions / Places / Cities / Seas...',
        field: 'places',
      },
      {
        title: 'Content types',
        field: 'objectProvides',
      },
      {
        title: 'Topics',
        field: 'topic',
      },
      {
        title: 'Issued',
        field: 'issued',
      },
      {
        title: 'Time coverage',
        field: 'time_coverage',
      },
      {
        title: 'Format',
        field: 'format',
      },
    ],
  },
};
