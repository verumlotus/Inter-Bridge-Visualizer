# Inter-Bridge-Visualizer

Analytics and insights for data aggregated from multiple bridges and chains. 

## Background
Bridges have become a more prominent part of the ecosystem as we move into a cross-chain world. This website is intended to allow users to get a bird's eye view of the different bridges compared against each other. The metrics here focus on analytics invovling all bridges, rather than drilling down on one bridge specifically. Users can answer questions such as: 
- “How do bridges compare to each other in terms of TVL (across all chains and all assets)?”
- “For a certain chain, across all bridges what is the TVL on that chain?”
- “For a certain chain, what is the breakdown of TVL by asset (across all bridges)?”
- “For a certain asset, what bridges are used to bridge that asset?”
- Etc.

Note that this is a prototype (it's rough around the edges). This may improved in the future, or hopefully it inspires someone to build something more polished.

<!-- ![Inter-Bridge-Explorer-Gif](https://user-images.githubusercontent.com/97858468/171520543-3b5b1658-db95-4b29-a8bd-fa3e2328a9b8.gif) -->
<p align="center">
  <img src="https://user-images.githubusercontent.com/97858468/171520543-3b5b1658-db95-4b29-a8bd-fa3e2328a9b8.gif" width="250px" height="250px"/>
</p>

## Architecture
This website utilizes a fairly standard Architecture. The frontend is built using [Next.js](https://nextjs.org/) and deployed using [Vercel](https://vercel.com). To update bridge data, and AWS Lambda Cron job is run every day to fetch data from various data sources (currently DeFi Llama's open API), format it, and store it in a database for future retrieval. Our database is currently a [MongoDB Atlas Cluster](https://www.mongodb.com/atlas/database) instance, and we use [Prisma](https://www.prisma.io/) as our ORM. Vercel deploys serverless lambda functions for each of our API routes, and the client fetches the necessary data from these endpoints.

<img width="712" alt="image" src="https://user-images.githubusercontent.com/97858468/171520936-62da35f5-a637-429b-b4d3-788e5ba2bafa.png">

## Improvements
There are many improvements to be made. The website very much followed the "if you're not embarassed when shipping, you shipped too late" mentality. The frontend libraries and formatting can be improved to provide a better user experience. Data cleasning and parsing can be improved on the backend to smoothen out irregularities with the data. An extension of this could add more chains and include more data sources (including direct contract queries) to provide more granular data. 

## Credits
Part of this projet was inspired by the [L2Beats](https://l2beat.com/) team, who have done great work in bringing transparency to the L2 ecosystem. The data here comes from open API created by the awesome [DeFi Llama](https://defillama.com/) team. 


