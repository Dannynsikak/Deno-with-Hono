import { Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
const app = new Hono().basePath("/api");

interface SpeciesDetails {
  genus: string;
  species: string;
  full_name: string;
  habitats: Array<string>;
}

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

app.get("/species/:name", (c) => {
  const { name } = c.req.param();
  const data = MicrobialData[name];
  if (data !== undefined) {
    return c.json(data);
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    throw new HTTPException(404, { message: "Species not found in database." });
  }
}).delete((c) => {
  const { name } = c.req.param();
  const data = MicrobialData[name];
  if (data !== undefined) {
    MicrobialData[name] = undefined;
    return c.text(`Deleted ${name} in database`);
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    throw new HTTPException(404, { message: "Species not found in database." });
  }
});

app.get("/species/:name/habitats", async (c) => {
  const { name } = c.req.param();
  const data = MicrobialData[name];
  if (data !== undefined) {
    const res = await app.request(`/api/species/${name}`);
    const data: SpeciesDetails | undefined = await res.json();
    if (data) {
      return c.json({ habitats: data.habitats });
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      throw new HTTPException(503, { message: "Server Error." });
    }
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    throw new HTTPException(404, { message: "Species not found in database." });
  }
}).put("/species/:name/habitats", async (c) => {
  const { name } = c.req.param();

  // Check if the species exists in the database
  const microbialData = MicrobialData[name];
  if (!microbialData) {
    throw new HTTPException(404, { message: "Species not found in database." });
  }

  try {
    // Parse the request body
    const body = await c.req.json();

    // Validate the required data
    if (!body.habitats || !Array.isArray(body.habitats)) {
      throw new HTTPException(400, {
        message: "Invalid request body. 'habitats' must be an array.",
      });
    }

    // Update the habitats in the database
    microbialData.habitats = body.habitats;

    return c.json({
      message: "Habitats updated successfully.",
      updated: microbialData,
    });
  } catch (error) {
    console.error("Error updating habitats:", error);
    throw new HTTPException(500, { message: "Internal Server Error." });
  }
});
if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}
