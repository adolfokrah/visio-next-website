"use client";
import { Cms } from "visio-cms-lib";
import "@/node_modules/visio-cms-lib/dist/lib.css";
import blocks from "@/app/blocks";

export default function Home() {
  return (
    <Cms
      allowImageTransformation={false}
      blocks={blocks}
      defaultLanguage={{
        language: "English",
        locale: "en-us",
      }}
      supportedLanguages={[
        {
          language: "English",
          locale: "en-us",
        },
        {
          language: "Spanish",
          locale: "es",
        },
        {
          language: "French",
          locale: "fr",
        },
        {
          language: "German",
          locale: "de",
        },
        {
          language: "Finish",
          locale: "fi",
        },
      ]}
      emailSender="Visio cms <noreply@visiocms.com>"
      projectId="urhvrfatpmdbwttotlwc"
      supabaseProjectUrl={process.env.NEXT_PUBLIC_SUPABASE_URL || ""}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANONKEY || ""}
    />
  );
}
