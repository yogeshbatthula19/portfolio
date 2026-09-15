import React from 'react';
import { ChevronRight, ArrowUpRight, Mail, Briefcase, Globe, User } from './symbols.jsx';

export default function AboutMe({ onContact, onProjects }) {
  return (
    <div className="apple-profile-view">

      {/* Hero Banner — Apple Leadership Profile Style */}
      <section className="apple-profile-hero">
        <div className="apple-profile-hero-content">
          <div className="apple-profile-headings">
            <h1 className="apple-profile-name">Yogesh Battula</h1>
            <p className="apple-profile-role">Senior Product Designer</p>
            <div className="apple-profile-meta">
              <span><Briefcase size={14} /> Product & Design Systems</span>
              <span><Globe size={14} /> Hyderabad, India</span>
            </div>
          </div>
          <div className="apple-profile-portrait-wrap">
            <img
              src="/images/yogesh-hero.png"
              alt="Yogesh Battula"
              className="apple-profile-portrait"
            />
          </div>
        </div>
      </section>

      {/* Editorial Biography — 2-Column Apple Profile Grid */}
      <section className="apple-profile-body">
        <div className="apple-profile-columns">
          <div className="apple-profile-col">
            <p className="apple-profile-lead">
              Yogesh Battula is a Senior Product Designer focused on turning complex workflows into intuitive, thoughtful, and human-centered digital experiences.
            </p>
            <p>
              With deep craft spanning healthcare, sports technology, and multi-platform digital systems, Yogesh bridges user needs with technical architecture. Throughout his design career, he has spearheaded end-to-end product design across web, mobile, and desktop environments — including comprehensive platforms like <strong>Recovery</strong> (rehabilitation for surgeons, physiotherapists, and patients) and <strong>Trosky 365</strong> (guided conversational coaching for athletes).
            </p>
            <p>
              He approaches product design not as surface decoration, but as a system of decisions: aligning business intent, engineering feasibility, and genuine human empathy to create tools people love using every day.
            </p>

            <div className="apple-profile-highlight-box">
              <h4>Areas of Expertise</h4>
              <div className="apple-profile-tags">
                <span>Product Design</span>
                <span>Interaction Design</span>
                <span>Design Systems</span>
                <span>Prototyping</span>
                <span>UX Architecture</span>
                <span>Mobile & Web</span>
              </div>
            </div>
          </div>

          <div className="apple-profile-col">
            <p>
              Yogesh has led critical design initiatives focused on clarity, systematic scalability, and emotional resonance. He champions craft in every micro-interaction — from fluid spring physics and state transitions to accessible keyboard navigation and ergonomic layout hierarchies.
            </p>
            <p>
              He partners closely with cross-functional engineering teams, product managers, and domain specialists to take ideas from ambiguous sketches to robust production systems. His work is guided by the philosophy that simplicity is the ultimate sophistication — eliminating noise until only purpose remains.
            </p>
            <p>
              Beyond interface design, Yogesh explores creative coding, motion design, and intelligent interfaces that anticipate user intent. He combines rigorous systems thinking with modern frontend craft to ensure designs are realized with pixel-perfect fidelity.
            </p>

            <div className="apple-profile-actions">
              <button className="apple-profile-btn primary" onClick={onProjects}>
                Explore Selected Work <ArrowUpRight size={15} />
              </button>
              <button className="apple-profile-btn secondary" onClick={onContact}>
                Get in Touch <Mail size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
