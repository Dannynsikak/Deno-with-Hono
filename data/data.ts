import { SpeciesDetails } from "../types/types.ts";

const MicrobialData: Record<string, SpeciesDetails | undefined> = {
  "helicobacter_pylori": {
    genus: "Helicobater",
    species: "pylori",
    full_name: "Helicobacter pylori",
    habitats: [
      "aquatic",
      "human gut",
    ],
  },
  "escherichia_coli": {
    genus: "Escherichia",
    species: "coli",
    full_name: "Escherichia coli",
    habitats: [
      "aquatic",
      "human gut",
    ],
  },
};

export default MicrobialData;
