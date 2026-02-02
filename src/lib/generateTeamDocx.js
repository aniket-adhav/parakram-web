import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function generateTeamDocx(team) {
  const templatePath = path.join(
    process.cwd(),
    "src/templates/PARAKRAM_REGISTRATION_TEMPLATE.docx"
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error("DOCX template not found");
  }

  const content = fs.readFileSync(templatePath, "binary");
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // 🔑 MATCH TEMPLATE VARIABLES EXACTLY
  doc.render({
    sport: team.sport,
    category: team.category,
    department: team.department,
    teamName: `${team.department} TEAM`,
    captainName: team.captain.name,
    captainMobile: team.captain.mobile,

    players: team.players.map((p, i) => ({
      sr: i + 1,
      secretCode: p.secretCode,
      name: `${p.firstName} ${p.lastName}`,
      year: p.year,
      mobile: p.mobile,
    })),
  });

  return doc.getZip().generate({ type: "nodebuffer" });
}
