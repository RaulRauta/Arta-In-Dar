import { distinction } from "./distinction";
import { newsAuthor } from "./newsAuthor";
import { newsPost } from "./newsPost";
import { newsTemplateBlock, newsTemplatePresetBlocks } from "./newsTemplateBlock";
import { pilgrimageArtwork } from "./pilgrimageArtwork";
import { teamGroup } from "./teamGroup";
import { teamMember } from "./teamMember";

export const schemaTypes = [
  teamGroup,
  teamMember,
  pilgrimageArtwork,
  distinction,
  newsAuthor,
  newsTemplateBlock,
  ...newsTemplatePresetBlocks,
  newsPost,
];
