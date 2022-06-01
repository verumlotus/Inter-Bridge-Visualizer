import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';


export default function Faq() {
  return (
    <div style={{padding: "11rem 0 0 0"}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What&apos;s the purpose of this website?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant={"body1"}>
            Bridges have become a more prominent part of the ecosystem as we move into a cross-chain world. This website is intended to allow users to 
            get a bird&apos;s eye view of the different bridges compared against each other. The metrics here focus on analytics invovling all bridges, 
            rather than drilling down on one bridge specifically.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>This website is a little hard to use</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant={"body1"}>
            Yep! Very much a &quot;if you&apos;re not embarassed when shipping, you shipped too late&quot; mentality. This is a prototype (pretty easy to tell it&apos;s rough around the edges). 
            This may improved in the future, or hopefully it inspires someone to build something more polished.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Where is the data coming from?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant={"body1"}>
            Most of the data is sourced from the awesome folks over at <Link href={"https://defillama.com/"}> DeFi Llama</Link>! They&apos;ve 
            provided a free API that anyone can use to query data and derive their own insights from. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Some of the data is missing or looks funny</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant={"body1"}>
            We don&apos;t have all the data for every bridge (e.g. some data points may be missing) and some of the aggregation techniques (e.g. totalling
            the TVL by bridge for a paritcular chain) rely on data formatting assumptions that don&apos;t always hold true. This is meant to give a rough overview 
            of the bridge ecosystem. Also, note that bridges have different models that can significantly affect the TVL calculation, so these numbers shouldn&apos;t be viewed in isolation.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
