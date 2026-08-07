"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/home/reveal";
import type { AboutTeamGroup, AboutTeamMember } from "@/lib/about-data";

type AboutTeamProps = {
  groups: AboutTeamGroup[];
};

function splitParagraphs(text?: string) {
  return (text || "")
    .split(/\n{1,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function MemberImage({ member }: { member: AboutTeamMember }) {
  if (!member.image) {
    return (
      <div className="sculpted-portrait__placeholder" aria-hidden="true">
        {member.name.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      src={member.image}
      alt={member.imageAlt || member.name}
      fill
      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
      className="object-cover"
    />
  );
}

export function AboutTeam({ groups }: AboutTeamProps) {
  const [activeMember, setActiveMember] = useState<AboutTeamMember | null>(null);
  const bioParagraphs = splitParagraphs(activeMember?.bio);

  useEffect(() => {
    if (!activeMember) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveMember(null);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeMember]);

  if (!groups.length) {
    return (
      <section className="team-stratum team-stratum--calcar">
        <div className="shell">
          <Reveal className="team-empty-state">
            <p className="eyebrow">Straturi în lucru</p>
            <h2>Echipa va fi cioplită aici, persoană cu persoană.</h2>
            <p>
              În curând, acest spațiu va aduna oamenii, rolurile și poveștile
              care susțin asociația din interior.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          className={`team-stratum team-stratum--${group.material}`}
        >
          <div className="shell">
            <Reveal className="team-stratum__heading">
              <span className="team-stratum__number">
                {group.number || String(groupIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="eyebrow">
                  Stratul {String(groupIndex + 1).padStart(2, "0")}
                </p>
                <h2>{group.title}</h2>
                {group.description ? (
                  <p className="team-stratum__description">{group.description}</p>
                ) : null}
              </div>
              <span className="team-stratum__line" />
            </Reveal>
            <div
              className={`team-grid ${
                group.members.length === 2 ? "team-grid--compact" : ""
              }`}
            >
              {group.members.map((member, index) => (
                <Reveal key={member.id} delay={Math.min(index * 0.05, 0.2)}>
                  <button
                    type="button"
                    className="sculpted-portrait sculpted-portrait--button"
                    onClick={() => setActiveMember(member)}
                    aria-label={`Deschide povestea pentru ${member.name}`}
                  >
                    <div className="sculpted-portrait__image">
                      <MemberImage member={member} />
                    </div>
                    <div className="sculpted-portrait__inscription">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                      {member.shortDescription ? (
                        <small>{member.shortDescription}</small>
                      ) : null}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <AnimatePresence>
        {activeMember ? (
          <motion.div
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="team-modal__backdrop"
              onClick={() => setActiveMember(null)}
              aria-label="Închide povestea"
            />
            <motion.article
              className="team-modal__panel"
              initial={{ y: 32, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 32, scale: 0.97 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="team-modal__close"
                onClick={() => setActiveMember(null)}
                aria-label="Închide"
              >
                ×
              </button>
              <div className="team-modal__image">
                <MemberImage member={activeMember} />
              </div>
              <div className="team-modal__copy">
                <p className="eyebrow">Portret de atelier</p>
                <h3 id="team-modal-title">{activeMember.name}</h3>
                <p className="team-modal__role">{activeMember.role}</p>
                {activeMember.quote ? (
                  <blockquote>„{activeMember.quote}”</blockquote>
                ) : null}
                {bioParagraphs.length ? (
                  <div className="team-modal__bio">
                    {bioParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="team-modal__bio-muted">
                    Povestea acestei persoane va prinde contur în curând.
                  </p>
                )}
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
