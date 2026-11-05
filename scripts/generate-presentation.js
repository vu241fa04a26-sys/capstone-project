const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Daymark Tasks Project Team";
pptx.subject = "Capstone project overview";
pptx.title = "Daymark Tasks | Capstone Overview";
pptx.company = "Daymark Tasks";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Aptos",
  lang: "en-US",
};

const W = 13.333;
const H = 7.5;
const C = {
  forest: "234C3D",
  green: "3C7058",
  softGreen: "E8F0E8",
  paleGreen: "D4E1D2",
  terracotta: "B65D42",
  paper: "F4F5F0",
  white: "FFFFFF",
  ink: "253A30",
  muted: "718078",
  line: "DCE4DC",
  paleRed: "F6E9E3",
};

function addText(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, {
    x,
    y,
    w,
    h,
    margin: 0,
    breakLine: false,
    fit: "shrink",
    fontFace: "Aptos",
    fontSize: 14,
    color: C.ink,
    valign: "mid",
    ...options,
  });
}

function addRect(slide, x, y, w, h, fill, options = {}) {
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: fill, transparency: 100 },
    ...options,
  });
}

function addLine(slide, x, y, w, h, color = C.line, width = 1) {
  slide.addShape(pptx.ShapeType.line, {
    x,
    y,
    w,
    h,
    line: { color, width },
  });
}

function addFrame(section, title, page) {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addText(slide, "DAYMARK  /  TASKS", 0.68, 0.32, 3.2, 0.24, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.1,
    color: C.forest,
  });
  addText(slide, section.toUpperCase(), 10.1, 0.32, 2.55, 0.24, {
    fontSize: 9,
    bold: true,
    charSpacing: 1,
    color: C.terracotta,
    align: "right",
  });
  addLine(slide, 0.68, 0.72, 11.97, 0, C.line, 1);
  addText(slide, title, 0.68, 0.91, 11.8, 0.6, {
    fontFace: "Georgia",
    fontSize: 28,
    color: C.forest,
  });
  addLine(slide, 0.68, 7.08, 11.97, 0, C.line, 0.8);
  addText(slide, "CAPSTONE PROJECT  ·  MERN STACK", 0.68, 7.16, 5.5, 0.16, {
    fontSize: 8,
    bold: true,
    charSpacing: 0.7,
    color: C.muted,
  });
  addText(slide, String(page).padStart(2, "0"), 12.02, 7.14, 0.62, 0.2, {
    fontSize: 9,
    bold: true,
    color: C.forest,
    align: "right",
  });
  return slide;
}

function addCard(slide, x, y, w, h, title, body, accent = C.green) {
  addRect(slide, x, y, w, h, C.white, {
    line: { color: C.line, width: 0.8 },
  });
  addRect(slide, x, y, 0.07, h, accent);
  addText(slide, title, x + 0.22, y + 0.2, w - 0.42, 0.38, {
    fontFace: "Georgia",
    fontSize: 16,
    color: C.forest,
  });
  addText(slide, body, x + 0.22, y + 0.7, w - 0.42, h - 0.88, {
    fontSize: 11,
    color: C.muted,
    valign: "top",
    breakLine: false,
  });
}

function addBullet(slide, x, y, text, w, color = C.ink) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x,
    y: y + 0.09,
    w: 0.09,
    h: 0.09,
    fill: { color: C.terracotta },
    line: { color: C.terracotta },
  });
  addText(slide, text, x + 0.2, y, w - 0.2, 0.38, {
    fontSize: 12,
    color,
    valign: "top",
  });
}

function addArrow(slide, x, y, w, color = C.green) {
  slide.addShape(pptx.ShapeType.line, {
    x,
    y,
    w,
    h: 0,
    line: { color, width: 1.6, endArrowType: "triangle" },
  });
}

function addNumber(slide, number, x, y, fill = C.softGreen) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x,
    y,
    w: 0.42,
    h: 0.42,
    fill: { color: fill },
    line: { color: fill },
  });
  addText(slide, String(number).padStart(2, "0"), x, y + 0.01, 0.42, 0.37, {
    fontSize: 10,
    bold: true,
    color: C.forest,
    align: "center",
  });
}

function addCodeLine(slide, value, x, y, w, color = C.softGreen) {
  addText(slide, value, x, y, w, 0.28, {
    fontFace: "Consolas",
    fontSize: 11,
    color,
  });
}

{
  const slide = pptx.addSlide();
  slide.background = { color: C.forest };
  addText(slide, "CAPSTONE PROJECT  /  2026", 0.86, 0.72, 4.8, 0.28, {
    fontSize: 10,
    bold: true,
    charSpacing: 1.6,
    color: C.paleGreen,
  });
  addText(slide, "DAYMARK", 0.82, 1.52, 6.7, 0.78, {
    fontFace: "Georgia",
    fontSize: 48,
    color: C.white,
  });
  addText(slide, "TASKS", 0.88, 2.42, 3.2, 0.42, {
    fontSize: 17,
    bold: true,
    charSpacing: 4,
    color: "D58A6E",
  });
  addText(
    slide,
    "A calm, persistent task planner\nbuilt on the MERN stack",
    0.88,
    3.28,
    5.9,
    0.94,
    {
      fontFace: "Georgia",
      fontSize: 22,
      color: "E6EEE7",
      valign: "top",
      breakLine: false,
    },
  );
  addLine(slide, 0.9, 5.02, 1.1, 0, "D58A6E", 2.2);
  addText(slide, "CAPTURE  ·  FOCUS  ·  FOLLOW THROUGH", 0.88, 5.22, 5.8, 0.3, {
    fontSize: 10,
    bold: true,
    charSpacing: 1.15,
    color: C.paleGreen,
  });
  addText(
    slide,
    "MongoDB  /  Express  /  React  /  Node.js",
    0.88,
    6.5,
    5.8,
    0.24,
    {
      fontSize: 10,
      color: "BCCFC0",
    },
  );

  addRect(slide, 8.0, 1.25, 4.35, 4.9, "F7F8F3", {
    line: { color: "F7F8F3", transparency: 100 },
  });
  addText(slide, "YOUR PLAN", 8.38, 1.62, 2.2, 0.22, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.2,
    color: C.muted,
  });
  addText(slide, "Today, in focus", 8.38, 1.98, 3.2, 0.4, {
    fontFace: "Georgia",
    fontSize: 21,
    color: C.forest,
  });
  addRect(slide, 8.38, 2.63, 3.56, 0.56, C.white, {
    line: { color: C.line, width: 0.8 },
  });
  addRect(slide, 8.58, 2.8, 0.18, 0.18, C.green, {
    radius: 0.1,
    line: { color: C.green },
  });
  addText(slide, "Shape the project story", 8.92, 2.76, 2.72, 0.27, {
    fontSize: 11,
    color: C.ink,
  });
  addRect(slide, 8.38, 3.32, 3.56, 0.56, C.white, {
    line: { color: C.line, width: 0.8 },
  });
  addRect(slide, 8.58, 3.49, 0.18, 0.18, C.paper, {
    line: { color: "B8C6BA", width: 1 },
  });
  addText(slide, "Review API behavior", 8.92, 3.45, 2.72, 0.27, {
    fontSize: 11,
    color: C.ink,
  });
  addRect(slide, 8.38, 4.01, 3.56, 0.56, C.white, {
    line: { color: C.line, width: 0.8 },
  });
  addRect(slide, 8.58, 4.18, 0.18, 0.18, C.paper, {
    line: { color: "B8C6BA", width: 1 },
  });
  addText(slide, "Polish final details", 8.92, 4.14, 2.72, 0.27, {
    fontSize: 11,
    color: C.ink,
  });
  addText(slide, "1 of 3 complete", 8.38, 4.9, 1.8, 0.2, {
    fontSize: 9,
    color: C.muted,
  });
  addRect(slide, 8.38, 5.25, 3.56, 0.07, "E0E7DF");
  addRect(slide, 8.38, 5.25, 1.18, 0.07, C.green);
  addText(slide, "CLEAR MIND. CLEAR NEXT STEP.", 8.38, 5.65, 3.6, 0.2, {
    fontSize: 8,
    bold: true,
    charSpacing: 1.1,
    color: C.terracotta,
  });
}

{
  const slide = addFrame("Context", "Make the next step easier to see.", 2);
  addText(
    slide,
    "Everyday tasks compete for attention. Daymark keeps capture and follow-through in one small, persistent space.",
    0.7,
    1.63,
    11.4,
    0.5,
    {
      fontSize: 14,
      color: C.muted,
    },
  );
  addCard(
    slide,
    0.72,
    2.55,
    3.78,
    2.74,
    "Capture",
    "Write a task once and keep it in a dedicated list instead of relying on memory.",
    C.terracotta,
  );
  addCard(
    slide,
    4.76,
    2.55,
    3.78,
    2.74,
    "Focus",
    "Use simple status filters and counts to understand what is open and what is done.",
    C.green,
  );
  addCard(
    slide,
    8.8,
    2.55,
    3.78,
    2.74,
    "Follow through",
    "Update or remove tasks with clear feedback and MongoDB persistence.",
    C.terracotta,
  );
  addText(slide, "DESIGN PRINCIPLE", 0.78, 5.82, 1.75, 0.2, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.1,
    color: C.green,
  });
  addText(
    slide,
    "Keep the workflow small, the state visible, and the next action obvious.",
    2.55,
    5.73,
    9.2,
    0.38,
    {
      fontFace: "Georgia",
      fontSize: 17,
      color: C.forest,
    },
  );
}

{
  const slide = addFrame("Experience", "A short loop from thought to done.", 3);
  const steps = [
    ["Capture", "Enter a task title and add it to the list."],
    ["Review", "See open and completed work at a glance."],
    ["Complete", "Mark a task done or reopen it when plans change."],
    ["Reset", "Remove tasks that no longer belong on the list."],
  ];
  const x = [0.82, 3.98, 7.14, 10.3];
  steps.forEach((step, index) => {
    addNumber(
      slide,
      index + 1,
      x[index],
      2.32,
      index === 3 ? C.paleRed : C.softGreen,
    );
    addText(slide, step[0], x[index], 2.98, 2.2, 0.4, {
      fontFace: "Georgia",
      fontSize: 20,
      color: C.forest,
    });
    addText(slide, step[1], x[index], 3.55, 2.35, 0.84, {
      fontSize: 12,
      color: C.muted,
      valign: "top",
    });
    if (index < steps.length - 1) {
      addArrow(slide, x[index] + 1.8, 2.53, 1.02, "A9BCA9");
    }
  });
  addRect(slide, 0.82, 5.15, 11.7, 0.78, C.softGreen);
  addText(
    slide,
    "The list is a working surface, not a complicated project-management system.",
    1.12,
    5.35,
    11.1,
    0.32,
    {
      fontFace: "Georgia",
      fontSize: 16,
      color: C.forest,
      align: "center",
    },
  );
}

{
  const slide = addFrame(
    "Product",
    "A focused interface with useful feedback.",
    4,
  );
  addRect(slide, 0.76, 1.8, 4.15, 4.68, C.white, {
    line: { color: C.line, width: 0.9 },
  });
  addText(slide, "MY TASKS", 1.08, 2.1, 2.4, 0.24, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.2,
    color: C.muted,
  });
  addText(slide, "Today", 1.08, 2.5, 2.6, 0.42, {
    fontFace: "Georgia",
    fontSize: 23,
    color: C.forest,
  });
  addText(slide, "2 remaining", 3.45, 2.62, 1.02, 0.22, {
    fontSize: 9,
    color: C.muted,
    align: "right",
  });
  addRect(slide, 1.08, 3.22, 3.46, 0.6, C.softGreen);
  addText(slide, "+", 1.27, 3.34, 0.3, 0.24, {
    fontSize: 17,
    color: C.green,
    align: "center",
  });
  addText(slide, "Add a task...", 1.68, 3.38, 2.5, 0.18, {
    fontSize: 10,
    color: "8A968D",
  });
  [
    "Review database setup",
    "Draft project overview",
    "Choose next improvement",
  ].forEach((value, index) => {
    const yy = 4.08 + index * 0.62;
    addLine(slide, 1.08, yy + 0.46, 3.46, 0, C.line, 0.65);
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 1.12,
      y: yy + 0.09,
      w: 0.2,
      h: 0.2,
      fill: { color: index === 1 ? C.green : C.white },
      line: { color: index === 1 ? C.green : "BFCBBF", width: 1 },
    });
    addText(slide, value, 1.5, yy + 0.04, 2.95, 0.28, {
      fontSize: 10,
      color: index === 1 ? "8A968D" : C.ink,
      strike: index === 1,
    });
  });
  addBullet(slide, 5.55, 1.98, "All / To do / Completed filters", 6.2);
  addBullet(slide, 5.55, 2.75, "Task counts and completion progress", 6.2);
  addBullet(slide, 5.55, 3.52, "Loading, empty, and retry states", 6.2);
  addBullet(slide, 5.55, 4.29, "Inline validation and API error feedback", 6.2);
  addBullet(
    slide,
    5.55,
    5.06,
    "Responsive layout and keyboard focus styles",
    6.2,
  );
  addText(
    slide,
    "The mockup is illustrative; the live interface is implemented in React.",
    5.55,
    6.0,
    6.2,
    0.24,
    {
      fontSize: 9,
      italic: true,
      color: C.muted,
    },
  );
}

{
  const slide = addFrame("Engineering", "A small full-stack request path.", 5);
  const nodes = [
    {
      x: 0.8,
      title: "React client",
      body: "Task list\nFilters and summary\nLoading / error states",
    },
    {
      x: 5.04,
      title: "Express API",
      body: "Health endpoint\nTask CRUD routes\nRequest validation",
    },
    {
      x: 9.28,
      title: "MongoDB",
      body: "Task documents\nMongoose schema\nCreated / updated dates",
    },
  ];
  nodes.forEach((node, index) => {
    addRect(slide, node.x, 2.35, 3.18, 2.42, C.white, {
      line: { color: C.line, width: 0.9 },
    });
    addNumber(
      slide,
      index + 1,
      node.x + 0.24,
      2.63,
      index === 1 ? C.paleRed : C.softGreen,
    );
    addText(slide, node.title, node.x + 0.24, 3.25, 2.7, 0.38, {
      fontFace: "Georgia",
      fontSize: 19,
      color: C.forest,
    });
    addText(slide, node.body, node.x + 0.24, 3.79, 2.75, 0.76, {
      fontSize: 11,
      color: C.muted,
      breakLine: false,
      valign: "top",
    });
  });
  addArrow(slide, 4.12, 3.54, 0.76);
  addArrow(slide, 8.36, 3.54, 0.76);
  addText(slide, "JSON over HTTP", 3.48, 4.98, 1.88, 0.22, {
    fontSize: 9,
    color: C.muted,
    align: "center",
  });
  addText(slide, "Mongoose operations", 7.58, 4.98, 2.04, 0.22, {
    fontSize: 9,
    color: C.muted,
    align: "center",
  });
  addText(
    slide,
    "Development: React on :3000  →  Express on :5000  →  MongoDB on :27017",
    1.04,
    5.8,
    11.15,
    0.35,
    {
      fontSize: 11,
      bold: true,
      color: C.green,
      align: "center",
    },
  );
}

{
  const slide = addFrame(
    "Engineering",
    "Small schema, explicit constraints.",
    6,
  );
  addRect(slide, 0.78, 1.82, 5.35, 4.65, C.forest);
  addText(slide, "Task", 1.14, 2.12, 2.6, 0.48, {
    fontFace: "Georgia",
    fontSize: 24,
    color: C.white,
  });
  addLine(slide, 1.14, 2.78, 4.55, 0, "557465", 0.8);
  addCodeLine(slide, "_id       ObjectId", 1.14, 3.12, 4.4);
  addCodeLine(
    slide,
    "title     String, required, max 160",
    1.14,
    3.64,
    4.4,
    "F1D2C6",
  );
  addCodeLine(slide, "done      Boolean, default false", 1.14, 4.16, 4.4);
  addCodeLine(slide, "createdAt Date", 1.14, 4.68, 4.4);
  addCodeLine(slide, "updatedAt Date", 1.14, 5.2, 4.4);
  addText(slide, "MongoDB collection: tasks", 1.14, 5.91, 4.35, 0.24, {
    fontSize: 10,
    color: C.paleGreen,
  });

  addText(slide, "Why these constraints?", 6.82, 1.97, 5.2, 0.4, {
    fontFace: "Georgia",
    fontSize: 21,
    color: C.forest,
  });
  addBullet(slide, 6.84, 2.75, "Trim titles before storage.", 5.1);
  addBullet(slide, 6.84, 3.48, "Reject empty or overlong task names.", 5.1);
  addBullet(slide, 6.84, 4.21, "Require a boolean completion state.", 5.1);
  addBullet(slide, 6.84, 4.94, "Validate IDs before MongoDB lookups.", 5.1);
  addText(
    slide,
    "A deliberately narrow model keeps the demo easy to reason about and extend.",
    6.84,
    5.88,
    5.12,
    0.48,
    {
      fontSize: 11,
      color: C.muted,
      valign: "top",
    },
  );
}

{
  const slide = addFrame(
    "Engineering",
    "API contract: predictable inputs and outcomes.",
    7,
  );
  const rows = [
    ["GET", "/api/health", "Database readiness", "200 / 503"],
    ["GET", "/api/tasks", "List tasks, newest first", "200 / 503"],
    ["POST", "/api/tasks/add", "Create title (1–160 chars)", "201 / 400 / 503"],
    [
      "POST",
      "/api/tasks/update/:id",
      "Set { done: boolean }",
      "200 / 400 / 404 / 503",
    ],
    [
      "DELETE",
      "/api/tasks/delete/:id",
      "Remove task by ID",
      "200 / 400 / 404 / 503",
    ],
  ];
  const xs = [0.84, 2.48, 6.05, 9.72];
  const ws = [1.32, 3.32, 3.42, 2.7];
  const headers = ["METHOD", "ROUTE", "PURPOSE", "RESULTS"];
  headers.forEach((value, index) => {
    addText(slide, value, xs[index], 1.85, ws[index], 0.24, {
      fontSize: 9,
      bold: true,
      charSpacing: 1,
      color: C.muted,
    });
  });
  addLine(slide, 0.84, 2.22, 11.72, 0, C.green, 1.4);
  rows.forEach((row, rowIndex) => {
    const y = 2.42 + rowIndex * 0.7;
    if (rowIndex % 2 === 0) {
      addRect(slide, 0.76, y - 0.06, 11.82, 0.58, C.white, {
        line: { color: C.white, transparency: 100 },
      });
    }
    row.forEach((value, columnIndex) => {
      addText(slide, value, xs[columnIndex], y, ws[columnIndex], 0.32, {
        fontFace: columnIndex === 1 ? "Consolas" : "Aptos",
        fontSize: columnIndex === 1 ? 10 : 10,
        bold: columnIndex === 0,
        color:
          columnIndex === 0
            ? C.green
            : columnIndex === 3
            ? C.terracotta
            : C.ink,
      });
    });
  });
  addText(
    slide,
    "Error bodies use a consistent { error: string } shape. Malformed JSON and invalid values return 400.",
    0.84,
    6.25,
    11.5,
    0.3,
    {
      fontSize: 10,
      color: C.muted,
    },
  );
}

{
  const slide = addFrame(
    "Reliability",
    "Fail clearly when a dependency is unavailable.",
    8,
  );
  addRect(slide, 0.78, 1.85, 5.3, 4.62, C.white, {
    line: { color: C.line, width: 0.8 },
  });
  addText(slide, "STARTUP SEQUENCE", 1.12, 2.15, 3.4, 0.22, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.1,
    color: C.terracotta,
  });
  const sequence = [
    "Read MONGODB_URI",
    "Connect to MongoDB",
    "Listen on PORT (default 5000)",
  ];
  sequence.forEach((value, index) => {
    const y = 2.75 + index * 0.88;
    addNumber(slide, index + 1, 1.12, y, C.softGreen);
    addText(slide, value, 1.78, y + 0.06, 3.7, 0.3, {
      fontSize: 12,
      color: C.ink,
    });
    if (index < sequence.length - 1) {
      addLine(slide, 1.33, y + 0.44, 0, 0.42, "A9BCA9", 1);
    }
  });
  addRect(slide, 1.12, 5.54, 4.45, 0.58, C.paleRed);
  addText(
    slide,
    "No database connection → no API listener",
    1.3,
    5.7,
    4.05,
    0.22,
    {
      fontSize: 10,
      bold: true,
      color: C.terracotta,
      align: "center",
    },
  );

  addText(slide, "GUARDRAILS", 6.82, 2.0, 2.0, 0.22, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.1,
    color: C.green,
  });
  addBullet(
    slide,
    6.84,
    2.52,
    "Database-gated task routes return 503 when disconnected.",
    5.3,
  );
  addBullet(
    slide,
    6.84,
    3.35,
    "Invalid IDs, bodies, and titles return 400.",
    5.3,
  );
  addBullet(slide, 6.84, 4.18, "Missing records return 404.", 5.3);
  addBullet(
    slide,
    6.84,
    5.01,
    "The health endpoint exposes database state.",
    5.3,
  );
  addText(
    slide,
    "This avoids silent buffering and requests that appear to hang while MongoDB is down.",
    6.84,
    5.95,
    5.25,
    0.5,
    {
      fontSize: 10,
      color: C.muted,
      valign: "top",
    },
  );
}

{
  const slide = addFrame(
    "Getting started",
    "Run it locally in three terminals.",
    9,
  );
  const columns = [
    {
      x: 0.8,
      label: "01  DATABASE",
      color: C.forest,
      lines: [
        "Start MongoDB",
        "Default URI:",
        "127.0.0.1:27017",
        "Database:",
        "training-mern",
      ],
    },
    {
      x: 4.98,
      label: "02  API",
      color: C.green,
      lines: [
        "From repo root:",
        "npm install",
        "npm start",
        "Default port:",
        "5000",
      ],
    },
    {
      x: 9.16,
      label: "03  CLIENT",
      color: C.terracotta,
      lines: [
        "From client folder:",
        "npm install",
        "npm start",
        "Open:",
        "localhost:3000",
      ],
    },
  ];
  columns.forEach((column) => {
    addRect(slide, column.x, 2.0, 3.36, 3.74, C.white, {
      line: { color: C.line, width: 0.8 },
    });
    addRect(slide, column.x, 2.0, 3.36, 0.12, column.color);
    addText(slide, column.label, column.x + 0.24, 2.36, 2.88, 0.25, {
      fontSize: 9,
      bold: true,
      charSpacing: 1,
      color: column.color,
    });
    column.lines.forEach((line, index) => {
      addText(slide, line, column.x + 0.24, 2.92 + index * 0.45, 2.9, 0.3, {
        fontFace: line.includes("npm ") ? "Consolas" : "Aptos",
        fontSize: line.includes("npm ") ? 11 : 12,
        bold: line.includes("npm "),
        color: line.includes("npm ") ? C.forest : C.ink,
      });
    });
  });
  addText(
    slide,
    "Production: npm run build, then npm run start:prod (MongoDB remains required).",
    1.02,
    6.16,
    11.25,
    0.32,
    {
      fontSize: 11,
      color: C.muted,
      align: "center",
    },
  );
}

{
  const slide = addFrame(
    "Next steps",
    "A practical path beyond the prototype.",
    10,
  );
  const roadmap = [
    [
      "Now",
      "Single-user task CRUD\nMongo persistence\nResponsive interface",
      C.green,
    ],
    [
      "Next",
      "Automated API tests\nBrowser workflow tests\nBetter request logging",
      C.terracotta,
    ],
    [
      "Then",
      "Authentication\nUser-scoped tasks\nDue dates and priority",
      C.green,
    ],
    [
      "Before launch",
      "Dependency upgrades\nHTTPS and monitoring\nDeployment hardening",
      C.terracotta,
    ],
  ];
  roadmap.forEach((item, index) => {
    const x = 0.82 + index * 3.14;
    addRect(slide, x, 2.22, 2.8, 2.86, C.white, {
      line: { color: C.line, width: 0.8 },
    });
    addText(slide, item[0].toUpperCase(), x + 0.22, 2.5, 2.34, 0.24, {
      fontSize: 9,
      bold: true,
      charSpacing: 1,
      color: item[2],
    });
    addLine(slide, x + 0.22, 2.95, 2.34, 0, C.line, 0.8);
    addText(slide, item[1], x + 0.22, 3.25, 2.35, 1.3, {
      fontFace: "Aptos",
      fontSize: 12,
      color: C.ink,
      valign: "top",
    });
  });
  addText(
    slide,
    "A clear list is a small tool. Good engineering makes it dependable.",
    1.0,
    5.75,
    11.3,
    0.44,
    {
      fontFace: "Georgia",
      fontSize: 18,
      color: C.forest,
      align: "center",
    },
  );
  addText(slide, "DAYMARK TASKS  ·  CAPSTONE PROJECT", 4.1, 6.48, 5.1, 0.2, {
    fontSize: 9,
    bold: true,
    charSpacing: 1.4,
    color: C.terracotta,
    align: "center",
  });
}

const outputPath = path.join(
  __dirname,
  "..",
  "docs",
  "Daymark-Capstone-Overview.pptx",
);

async function main() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Created ${outputPath} (${pptx._slides.length} slides)`);
}

main().catch((error) => {
  console.error("Could not generate the presentation:", error);
  process.exitCode = 1;
});
