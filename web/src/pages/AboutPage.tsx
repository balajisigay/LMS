import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getAboutInfo, AboutInfo } from "../../../src/api/aboutService";

export const AboutPage: React.FC = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutInfo()
      .then(setAbout)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div style={styles.loading}>Loading...</div>
      </>
    );
  }

  if (!about) return null;

  return (
    <>
      <Header />

      <section style={styles.hero}>
        <h1 style={styles.title}>{about.name}</h1>
        <p style={styles.tagline}>{about.tagline}</p>
      </section>

      <section style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{about.stats.activeLearners.toLocaleString()}+</h2>
          <p>Active Learners</p>
        </div>

        <div style={styles.statCard}>
          <h2>{about.stats.courses}+</h2>
          <p>Courses</p>
        </div>

        <div style={styles.statCard}>
          <h2>{about.stats.satisfaction}%</h2>
          <p>Satisfaction</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Why Lumina?</h2>
        <p>
          Lumina is built to empower learners with industry-ready skills.
          We focus on hands-on learning, expert instructors, and real-world projects.
        </p>

        <p>
          Whether you're starting your career or upgrading your skills,
          Lumina helps you learn faster and smarter.
        </p>
      </section>

      <Footer />
    </>
  );
};

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  hero: {
    padding: "80px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    fontWeight: 800,
    marginBottom: "16px",
  },
  tagline: {
    fontSize: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    marginTop: "-40px",
    padding: "0 20px",
  },
  statCard: {
    background: "white",
    borderRadius: "16px",
    padding: "24px 32px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    minWidth: "200px",
  },
  content: {
    maxWidth: "900px",
    margin: "80px auto",
    padding: "0 20px",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#374151",
  },
  loading: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
};

export default AboutPage;
