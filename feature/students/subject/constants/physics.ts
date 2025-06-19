import { progress } from "motion/react";

export const physicsChapters = {
  paper1: {
    name: "Paper 1",
    chapters: [
      {
        name: "ENERGY",
        icon: "phy_energy",
        progress: 40,
        data: [
          { id: "1", subChapter: "Energy Stores and Systems", href: "/chapters/energy/energy-stores-and-systems", progress: 70, icon: "phy_energy_store" },
          { id: "2", subChapter: "Kinetic and Potential Energy Stores", href: "/chapters/energy/kinetic-and-potential-energy-stores", progress: 20, icon: "phy_kinetic" },
          { id: "3", subChapter: "Specific Heat Capacity", href: "/chapters/energy/specific-heat-capacity", progress: 20, icon: "phy_specific_heat" },
          { id: "4", subChapter: "Conservation of Energy and Power", href: "/chapters/energy/conservation-of-energy-and-power", progress: 0, icon: "phy_conservation_energy" },
          { id: "5", subChapter: "Conduction and Convection", href: "/chapters/energy/conduction-and-convection", progress: 0, icon: "phy_conduction" },
          { id: "6", subChapter: "Reducing Unwanted Energy Transfers", href: "/chapters/energy/reducing-unwanted-energy-transfers", progress: 0, icon: "phy_energy_transfers" },
          { id: "7", subChapter: "Efficiency", href: "/chapters/energy/efficiency", progress: 0, icon: "phy_efficiency" },
          { id: "8", subChapter: "Energy Resources and Their Uses", href: "/chapters/energy/energy-resources-and-their-uses", progress: 0, icon: "phy_energy_resource" },
          { id: "9", subChapter: "Wind, Solar, and Geothermal", href: "/chapters/energy/wind-solar-geothermal", progress: 0, icon: "phy_wind_solar" },
          { id: "10", subChapter: "Hydro-electricity, Waves, and Tides", href: "/chapters/energy/hydro-electricity-waves-tides", progress: 0, icon: "phy_hydro" },
          { id: "11", subChapter: "Bio-fuels and Non-renewables", href: "/chapters/energy/bio-fuels-and-non-renewables", progress: 0, icon: "phy_bio_fuels" },
          { id: "12", subChapter: "Trends in Energy Resource Use", href: "/chapters/energy/trends-in-energy-resource-use", progress: 0, icon: "phy_trends_energy" },
          { id: "13", subChapter: "Revision Questions for Chapter 1", href: "/chapters/energy/revision-questions", progress: 0, icon: "phy_ques" },
        ],
      },
      {
        name: "ELECTRICITY",
        icon: "phy_electricity",
        progress: 10,
        data: [
          { id: "1", subChapter: "Current and Circuit Symbols", href: "/chapters/electricity/current-and-circuit-symbols", progress: 0, icon: "phy_current" },
          { id: "2", subChapter: "Resistance and V=IR", href: "/chapters/electricity/resistance-and-V=IR", progress: 0, icon: "phy_resistanceVIR" },
          { id: "3", subChapter: "Resistance and I-V Characteristics", href: "/chapters/electricity/resistance-and-I-V-characteristics", progress: 0, icon: "phy_resistanceIV" },
          { id: "4", subChapter: "Circuit Devices", href: "/chapters/electricity/circuit-devices", progress: 0, icon: "phy_circuit_devices" },
          { id: "5", subChapter: "Series Circuits", href: "/chapters/electricity/series-circuits", progress: 0, icon: "phy_series_circuits" },
          { id: "6", subChapter: "Parallel Circuits", href: "/chapters/electricity/parallel-circuits", progress: 0, icon: "phy_parallel_circuits" },
          { id: "7", subChapter: "Investigating Resistance", href: "/chapters/electricity/investigating-resistance", progress: 0, icon: "phy_investigating_resistance" },
          { id: "8", subChapter: "Electricity in the Home", href: "/chapters/electricity/electricity-in-the-home", progress: 0, icon: "phy_electricity_home" },
          { id: "9", subChapter: "Power of Electrical Appliances", href: "/chapters/electricity/power-of-electrical-appliances", progress: 0, icon: "phy_power_electrical_appliances" },
          { id: "10", subChapter: "More on Power", href: "/chapters/electricity/more-on-power", progress: 0, icon: "phy_more_power" },
          { id: "11", subChapter: "The National Grid", href: "/chapters/electricity/the-national-grid", progress: 0, icon: "phy_the_national_grid" },
          { id: "12", subChapter: "Static Electricity", href: "/chapters/electricity/static-electricity", progress: 0, icon: "phy_static_electricity" },
          { id: "13", subChapter: "Electric Fields", href: "/chapters/electricity/electric-fields", progress: 0, icon: "phy_electric_fields" },
          { id: "14", subChapter: "Revision Questions for Chapter 2", href: "/chapters/electricity/revision-questions", progress: 0, icon: "phy_ques" }
        ],
      },
      {
        name: "PARTICLE MODEL OF MATTER",
        icon: "phy_matter",
        progress: 10,
        data: [
          { id: "1", subChapter: "Density of Materials", href: "/chapters/particle-model-of-matter/density-of-materials", progress: 0, icon: "phy_density_materials" },
          { id: "2", subChapter: "Internal Energy and Changes of State", href: "/chapters/particle-model-of-matter/internal-energy-and-changes-of-state", progress: 0, icon: "phy_internal_energy" },
          { id: "3", subChapter: "Specific Latent Heat", href: "/chapters/particle-model-of-matter/specific-latent-heat", progress: 0, icon: "phy_specific_latent" },
          { id: "4", subChapter: "Particle Motion in Gases", href: "/chapters/particle-model-of-matter/particle-motion-in-gases", progress: 0, icon: "phy_particle_motion" },
          { id: "5", subChapter: "Revision Questions for Chapter 3", href: "/chapters/particle-model-of-matter/revision-questions", progress: 0, icon: "phy_ques" }
        ],
      },
      {
        name: "ATOMIC STRUCTURE",
        icon: "phy_atom",
        progress: 10,
        data: [
          { id: "1", subChapter: "Developing the Model of the Atom", href: "/chapters/atomic-structure/developing-the-model-of-the-atom", progress: 0, icon: "phy_model_atom" },
          { id: "2", subChapter: "Isotopes and Nuclear Radiation", href: "/chapters/atomic-structure/isotopes-and-nuclear-radiation", progress: 0, icon: "phy_isotopes_nuclear" },
          { id: "3", subChapter: "Nuclear Equations", href: "/chapters/atomic-structure/nuclear-equations", progress: 0, icon: "phy_nuclear_equations" },
          { id: "4", subChapter: "Half-Life", href: "/chapters/atomic-structure/half-life", progress: 0, icon: "phy_half_life" },
          { id: "5", subChapter: "Background Radiation and Contamination", href: "/chapters/atomic-structure/background-radiation-and-contamination", progress: 0, icon: "phy_radiation_contamination" },
          { id: "6", subChapter: "Uses and Risks", href: "/chapters/atomic-structure/uses-and-risks", progress: 0, icon: "phy_uses_risks" },
          { id: "7", subChapter: "Fission and Fusion", href: "/chapters/atomic-structure/fission-and-fusion", progress: 0, icon: "phy_fission_fusion" },
          { id: "8", subChapter: "Revision Questions for Chapter 4", href: "/chapters/atomic-structure/revision-questions", progress: 0, icon: "phy_ques" }
        ],
      },
    ],
  },
  paper2: {
    name: "Paper 2",
    chapters: [
      {
        name: "FORCES",
        icon: "phy_forces",
        progress: 30,
        data: [
          { id: "1", subChapter: "Contact and Non-contact Forces", href: "/chapters/forces/contact-and-non-contact-forces", progress: 0, icon: "activity" },
          { id: "2", subChapter: "Weight, Mass, and Gravity", href: "/chapters/forces/weight-mass-resistance-and-virand-gravity", progress: 0, icon: "divide-square" },
          { id: "3", subChapter: "Resultant Force and Work Done", href: "/chapters/forces/resultant-force-and-work-done", progress: 0, icon: "trending-up" },
          { id: "4", subChapter: "Calculating Forces", href: "/chapters/forces/calculating-forces", progress: 0, icon: "cpu" },
          { id: "5", subChapter: "Forces and Elasticity", href: "/chapters/forces/forces-and-elasticity", progress: 0, icon: "git-branch" },
          { id: "6", subChapter: "Investigating Springs", href: "/chapters/forces/investigating-springs", progress: 0, icon: "git-fork" },
          { id: "7", subChapter: "Moments", href: "/chapters/forces/moments", progress: 0, icon: "search" },
          { id: "8", subChapter: "Fluid Pressure", href: "/chapters/forces/fluid-pressure", progress: 0, icon: "home" },
          { id: "9", subChapter: "Upthrust and Atmospheric Pressure", href: "/chapters/forces/upthrust-and-atmospheric-pressure", progress: 0, icon: "zap" },
          { id: "10", subChapter: "Distance, Displacement, Speed, and Velocity", href: "/chapters/forces/distance-displacement-speed-and-velocity", progress: 0, icon: "zap-off" },
          { id: "11", subChapter: "Acceleration", href: "/chapters/forces/acceleration", progress: 0, icon: "globe" },
          { id: "12", subChapter: "Distance-Time and Velocity-Time Graphs", href: "/chapters/forces/distance-time-and-velocity-time-graphs", progress: 0, icon: "cloud-lightning" },
          { id: "13", subChapter: "Terminal Velocity ", href: "/chapters/forces/terminal-velocity ", progress: 0, icon: "rss" },
          { id: "14", subChapter: "Revision Questions for Chapter 1", href: "/chapters/forces/revision-questions", progress: 0, icon: "file-question" },
        ],
      },
      {
        name: "WAVES",
        icon: "phy_waves",
        progress: 10,
        data: [
          { id: "1", subChapter: "Current and Circuit Symbols", href: "/chapters/electricity/current-and-circuit-symbols", progress: 0, icon: "activity" },
          { id: "2", subChapter: "Resistance and V=IR", href: "/chapters/electricity/resistance-and-vir", progress: 0, icon: "divide-square" },
        ],
      },
      {
        name: "MAGNETISM AND ELECTROMAGNETISM",
        icon: "phy_magnetism",
        progress: 10,
        data: [
          { id: "1", subChapter: "Current and Circuit Symbols", href: "/chapters/electricity/current-and-circuit-symbols", progress: 0, icon: "activity" },
          { id: "2", subChapter: "Resistance and V=IR", href: "/chapters/electricity/resistance-and-vir", progress: 0, icon: "divide-square" },
        ],
      },
      {
        name: "SPACE PHYSICS",
        icon: "phy_space_physics",
        progress: 10,
        data: [
          { id: "1", subChapter: "Current and Circuit Symbols", href: "/chapters/electricity/current-and-circuit-symbols", progress: 0, icon: "activity" },
          { id: "2", subChapter: "Resistance and V=IR", href: "/chapters/electricity/resistance-and-vir", progress: 0, icon: "divide-square" },
        ],
      },
    ],
  },
};