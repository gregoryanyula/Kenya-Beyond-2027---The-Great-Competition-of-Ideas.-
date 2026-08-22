import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import {
  Share2,
  Users,
  FileText,
  Building2,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Layers,
  Scale,
  Activity,
  X
} from "lucide-react";

export type NodeType = "politician" | "policy" | "lobby";

export interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: NodeType;
  roleOrCategory: string;
  influenceScore: number; // 1 to 10
  shortSummary: string;
  detailedBio: string;
  keyStance: string;
  article118Score?: number; // Public participation rating
  jurisdiction?: string;
  // D3 simulation coordinates
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  relationship: "sponsors" | "lobbies_for" | "opposes_litigates" | "oversight_amends" | "co_sponsors";
  description: string;
  financialStake?: string;
}

// Sample Comprehensive Kenyan Political & Policy Influence Graph
const NETWORK_NODES: NetworkNode[] = [
  // POLITICIANS & LEADERS
  {
    id: "cs_treasury",
    name: "National Treasury CS",
    type: "politician",
    roleOrCategory: "Executive / Cabinet",
    influenceScore: 9.5,
    shortSummary: "Custodian of fiscal policy, revenue bills, MTEF framework, and public debt management.",
    detailedBio: "Leads national budget formulation, IMF/World Bank negotiations, and introduces annual tax bills.",
    keyStance: "Fiscal consolidation, tax base widening, and debt sustainability within Article 201 mandates.",
    article118Score: 7.2,
    jurisdiction: "National Government"
  },
  {
    id: "chair_finance_comm",
    name: "National Assembly Finance Chair",
    type: "politician",
    roleOrCategory: "Parliamentary Committee",
    influenceScore: 9.0,
    shortSummary: "Heads parliamentary public hearings on tax legislation, tariffs, and revenue allocation.",
    detailedBio: "Reviews thousands of stakeholder memorandums under Article 118 before tabling committee reports.",
    keyStance: "Balancing revenue collection with consumer purchasing power and corporate competitiveness.",
    article118Score: 8.4,
    jurisdiction: "Parliament"
  },
  {
    id: "senate_devolution_chair",
    name: "Senate Devolution Committee Chair",
    type: "politician",
    roleOrCategory: "Senate Leadership",
    influenceScore: 8.2,
    shortSummary: "Protects county equitable revenue transfers and oversees intergovernmental relations.",
    detailedBio: "Champions the Division of Revenue Act (DoRA) and County Allocation of Revenue Act (CARA).",
    keyStance: "Pushes for KES 400B+ annual equitable share and timely Exchequer disbursements to 47 counties.",
    article118Score: 8.8,
    jurisdiction: "Senate & Counties"
  },
  {
    id: "cog_chair",
    name: "Council of Governors Chair",
    type: "politician",
    roleOrCategory: "County Executive",
    influenceScore: 8.7,
    shortSummary: "Represents 47 County Governments in intergovernmental budget negotiations.",
    detailedBio: "Coordinates county health, agriculture, and infrastructure priorities through IBEC.",
    keyStance: "Demands full costing and devolution of transferred national functions with dedicated funding.",
    article118Score: 8.0,
    jurisdiction: "Devolved Governments"
  },
  {
    id: "cs_health",
    name: "Ministry of Health CS",
    type: "politician",
    roleOrCategory: "Executive / Cabinet",
    influenceScore: 8.6,
    shortSummary: "Sponsors UHC rollout, SHIF transition, and Primary Health Care networks.",
    detailedBio: "Oversees the Social Health Authority (SHA), digital health records, and emergency fund pool.",
    keyStance: "Universal mandatory contributions with means-testing to fund catastrophic health claims.",
    article118Score: 6.5,
    jurisdiction: "National Government"
  },

  // POLICIES & BILLS
  {
    id: "finance_bill",
    name: "Finance & Revenue Act 2026/27",
    type: "policy",
    roleOrCategory: "Statutory Tax Bill",
    influenceScore: 9.8,
    shortSummary: "Primary annual tax omnibus introducing VAT, excise, digital tax, and income levies.",
    detailedBio: "Generates KES 2.8T+ in ordinary revenue to finance the national and county budget.",
    keyStance: "Statutory cornerstone of national revenue collection and debt amortization.",
    article118Score: 9.2,
    jurisdiction: "National / Devolved"
  },
  {
    id: "sha_shif_act",
    name: "Social Health Insurance (SHA/SHIF)",
    type: "policy",
    roleOrCategory: "Health Policy & Levy",
    influenceScore: 8.9,
    shortSummary: "Mandatory 2.75% household income contribution replacing the NHIF framework.",
    detailedBio: "Funds primary, secondary, and chronic care through the Primary Health & Emergency Fund.",
    keyStance: "Constitutional right to healthcare under Article 43(1)(a).",
    article118Score: 7.0,
    jurisdiction: "National Health"
  },
  {
    id: "affordable_housing_act",
    name: "Affordable Housing Act & Levy",
    type: "policy",
    roleOrCategory: "Housing & Urban Policy",
    influenceScore: 8.8,
    shortSummary: "1.5% matched employer/employee gross salary deduction for social housing units.",
    detailedBio: "Aims to construct 200,000+ units annually across all 290 constituencies with Jua Kali linkages.",
    keyStance: "Urban renewal, job creation for artisans, and formalizing informal settlements.",
    article118Score: 7.8,
    jurisdiction: "National / Urban"
  },
  {
    id: "dora_devolution",
    name: "Division of Revenue Act (DoRA)",
    type: "policy",
    roleOrCategory: "Devolution Division",
    influenceScore: 9.1,
    shortSummary: "Constitutional formula allocating ordinary revenue between National & County tiers.",
    detailedBio: "Guarantees the minimum 15% constitutional floor (currently > KES 400B) to 47 counties.",
    keyStance: "Heart of decentralized service delivery and regional economic equity.",
    article118Score: 8.9,
    jurisdiction: "Devolved Governance"
  },
  {
    id: "digital_economy_framework",
    name: "Digital Superhighway & Creator Tax",
    type: "policy",
    roleOrCategory: "Digital Economy",
    influenceScore: 7.8,
    shortSummary: "Broadband optic fiber network, AI hubs, and withholding tax on digital content creators.",
    detailedBio: "Expands 100,000km fiber optic network and 1,450 village digital transformation labs.",
    keyStance: "Modernizing young workforce while establishing equitable taxation on digital monetization.",
    article118Score: 8.1,
    jurisdiction: "Technology & Youth"
  },

  // SPECIAL INTEREST GROUPS & LOBBYING COALITIONS
  {
    id: "kepsa",
    name: "Kenya Private Sector Alliance (KEPSA)",
    type: "lobby",
    roleOrCategory: "Business Federation",
    influenceScore: 8.9,
    shortSummary: "Peak body for corporate Kenya representing over 500,000 direct and indirect businesses.",
    detailedBio: "Presents formal submissions on ease of doing business, corporate tax rates, and investor predictability.",
    keyStance: "Advocates for lower corporate taxes, stable regulatory environment, and reduced energy tariffs.",
    article118Score: 8.7,
    jurisdiction: "Private Sector"
  },
  {
    id: "kam",
    name: "Kenya Association of Manufacturers (KAM)",
    type: "lobby",
    roleOrCategory: "Industrial Coalition",
    influenceScore: 8.5,
    shortSummary: "Represents value-addition factories, agro-processors, and heavy industrialists.",
    detailedBio: "Lobbies aggressively against export promotion levies on raw materials and high import duties.",
    keyStance: "Zero-rating essential industrial inputs and enforcing Buy Kenya Build Kenya public procurement.",
    article118Score: 8.6,
    jurisdiction: "Manufacturing"
  },
  {
    id: "lsk",
    name: "Law Society of Kenya (LSK)",
    type: "lobby",
    roleOrCategory: "Constitutional & Legal Guild",
    influenceScore: 8.8,
    shortSummary: "Statutory bar association defending constitutionalism, public interest, and rule of law.",
    detailedBio: "Regularly litigates in High Court and Supreme Court challenging unconstitutional levies and flawed public participation.",
    keyStance: "Strict enforcement of Article 201 fiscal principles and Article 10 national values.",
    article118Score: 9.4,
    jurisdiction: "Legal & Judiciary"
  },
  {
    id: "kmpdu",
    name: "Medical Union (KMPDU)",
    type: "lobby",
    roleOrCategory: "Healthcare Workers Union",
    influenceScore: 8.1,
    shortSummary: "Represents medical doctors, pharmacists, and dentists across national & county hospitals.",
    detailedBio: "Lobbies on healthcare financing, doctor posting, intern stipends, and SHA hospital reimbursement.",
    keyStance: "Demands 15% Abuja Declaration health budget allocation and direct funding to county hospitals.",
    article118Score: 8.3,
    jurisdiction: "Healthcare"
  },
  {
    id: "genz_digital_guild",
    name: "Digital Creators & Gen-Z Civic Guild",
    type: "lobby",
    roleOrCategory: "Grassroots & Digital Union",
    influenceScore: 8.6,
    shortSummary: "Decentralized youth network organizing online civic audit, X-spaces, and public scrutiny.",
    detailedBio: "Spearheaded nationwide digital pushback on punitive tax bills and demand for governance accountability.",
    keyStance: "Transparency in public debt audit, removal of digital content taxes, and youth economic inclusion.",
    article118Score: 9.6,
    jurisdiction: "Youth & Grassroots"
  },
  {
    id: "moa",
    name: "Matatu Owners Association (MOA)",
    type: "lobby",
    roleOrCategory: "Public Transport Lobby",
    influenceScore: 7.9,
    shortSummary: "Key stakeholder in the 14-seater and bus transit sector moving 70% of commuters.",
    detailedBio: "Influences fuel road maintenance levy discussions, traffic regulations, and motor vehicle taxes.",
    keyStance: "Opposes fuel levy increases that force bus fare spikes on low-income commuters.",
    article118Score: 7.9,
    jurisdiction: "Transport"
  }
];

const NETWORK_LINKS: NetworkLink[] = [
  // CS Treasury connections
  { source: "cs_treasury", target: "finance_bill", relationship: "sponsors", description: "Cabinet Secretary drafts and introduces Finance Bill to Parliament.", financialStake: "KES 2.8 Trillion Revenue" },
  { source: "cs_treasury", target: "dora_devolution", relationship: "sponsors", description: "Sets the national revenue allocation baseline and exchequer schedules.", financialStake: "KES 400B+ Devolution Share" },
  { source: "cs_treasury", target: "chair_finance_comm", relationship: "oversight_amends", description: "Defends Treasury macroeconomic assumptions during parliamentary scrutiny." },

  // NA Finance Committee connections
  { source: "chair_finance_comm", target: "finance_bill", relationship: "oversight_amends", description: "Conducts Article 118 public hearings and tables committee amendments.", financialStake: "KES 150B in proposed adjustments" },
  { source: "chair_finance_comm", target: "digital_economy_framework", relationship: "oversight_amends", description: "Scrutinizes digital creator tax thresholds and e-TIMS compliance." },

  // CS Health & SHA connections
  { source: "cs_health", target: "sha_shif_act", relationship: "sponsors", description: "Sponsors Social Health Authority Regulations and rollout.", financialStake: "KES 140B Annual Health Pool" },

  // Senate & Devolution connections
  { source: "senate_devolution_chair", target: "dora_devolution", relationship: "sponsors", description: "Fights for increased county allocations against National Assembly reductions.", financialStake: "KES 420B Senate Target" },
  { source: "cog_chair", target: "dora_devolution", relationship: "lobbies_for", description: "Council of Governors petitions for prompt exchequer release and 100% costing.", financialStake: "KES 450B County Demand" },
  { source: "cog_chair", target: "sha_shif_act", relationship: "oversight_amends", description: "Demands ring-fencing of county facility reimbursements from the SHA pool." },

  // KEPSA & KAM Corporate Lobbying
  { source: "kepsa", target: "finance_bill", relationship: "lobbies_for", description: "Submitted 42 formal amendments to reduce withholding tax and improve VAT refunds.", financialStake: "KES 60B in tax concessions" },
  { source: "kam", target: "finance_bill", relationship: "opposes_litigates", description: "Opposed Export Investment Promotion Levy (EIPL) on raw manufacturing materials.", financialStake: "KES 25B industrial import impact" },
  { source: "kam", target: "chair_finance_comm", relationship: "lobbies_for", description: "Direct committee memorandums on energy cost reductions for local factories." },

  // Law Society of Kenya (LSK) Constitutional Litigation
  { source: "lsk", target: "finance_bill", relationship: "opposes_litigates", description: "Filed High Court constitutional petition citing inadequate Article 118 public participation." },
  { source: "lsk", target: "affordable_housing_act", relationship: "opposes_litigates", description: "Challenged levy collection mechanism and statutory compliance under Article 201." },
  { source: "lsk", target: "sha_shif_act", relationship: "opposes_litigates", description: "Petitions on data privacy in digital health records and means-testing fairness." },

  // KMPDU Doctors Union
  { source: "kmpdu", target: "sha_shif_act", relationship: "opposes_litigates", description: "Demanded resolution of facility tariff deficits and doctor posting guarantees." },
  { source: "kmpdu", target: "cs_health", relationship: "opposes_litigates", description: "Direct strike notices and collective bargaining agreement enforcement." },

  // Gen-Z Digital Guild
  { source: "genz_digital_guild", target: "finance_bill", relationship: "opposes_litigates", description: "Led civic mass protests, viral clause-by-clause explainers, and recall threats." },
  { source: "genz_digital_guild", target: "digital_economy_framework", relationship: "opposes_litigates", description: "Pushed back against 5% digital withholding tax and content monitoring." },
  { source: "genz_digital_guild", target: "chair_finance_comm", relationship: "opposes_litigates", description: "Flooded parliamentary public participation inbox with over 100,000 submissions." },

  // Matatu Owners Association (MOA)
  { source: "moa", target: "finance_bill", relationship: "lobbies_for", description: "Lobbied against the Road Maintenance Levy fuel price hike and motor vehicle tax." }
];

interface PolicyInfluenceNetworkGraphProps {
  className?: string;
  onSelectNode?: (node: NetworkNode) => void;
}

export const PolicyInfluenceNetworkGraph: React.FC<PolicyInfluenceNetworkGraphProps> = ({
  className = "",
  onSelectNode
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(NETWORK_NODES[0]);
  const [filterType, setFilterType] = useState<"all" | NodeType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRelationshipFilter, setActiveRelationshipFilter] = useState<string>("all");
  const [dimensions, setDimensions] = useState({ width: 800, height: 540 });

  // Responsive resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        setDimensions({
          width: clientWidth || 800,
          height: Math.max(500, Math.min(620, window.innerHeight * 0.65))
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Filtered nodes and links
  const { filteredNodes, filteredLinks } = useMemo(() => {
    let nodes = NETWORK_NODES;

    if (filterType !== "all") {
      nodes = nodes.filter((n) => n.type === filterType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      nodes = nodes.filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          n.roleOrCategory.toLowerCase().includes(q) ||
          n.shortSummary.toLowerCase().includes(q)
      );
    }

    const nodeIds = new Set(nodes.map((n) => n.id));
    let links = NETWORK_LINKS.filter((l) => {
      const src = typeof l.source === "string" ? l.source : l.source.id;
      const tgt = typeof l.target === "string" ? l.target : l.target.id;
      return nodeIds.has(src) && nodeIds.has(tgt);
    });

    if (activeRelationshipFilter !== "all") {
      links = links.filter((l) => l.relationship === activeRelationshipFilter);
    }

    return { filteredNodes: nodes, filteredLinks: links };
  }, [filterType, searchQuery, activeRelationshipFilter]);

  // Color mapping based on node type
  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case "politician":
        return { fill: "#3b82f6", stroke: "#1d4ed8", bg: "bg-blue-50 text-blue-800 border-blue-200", icon: "👔" };
      case "policy":
        return { fill: "#10b981", stroke: "#047857", bg: "bg-emerald-50 text-emerald-800 border-emerald-200", icon: "📜" };
      case "lobby":
        return { fill: "#a855f7", stroke: "#7e22ce", bg: "bg-purple-50 text-purple-800 border-purple-200", icon: "🏢" };
      default:
        return { fill: "#64748b", stroke: "#334155", bg: "bg-slate-50 text-slate-800 border-slate-200", icon: "•" };
    }
  };

  const getLinkColor = (rel: string) => {
    switch (rel) {
      case "sponsors":
        return "#10b981"; // Emerald
      case "opposes_litigates":
        return "#f43f5e"; // Rose
      case "lobbies_for":
        return "#a855f7"; // Purple
      case "oversight_amends":
        return "#3b82f6"; // Blue
      default:
        return "#94a3b8"; // Slate
    }
  };

  // Render D3 Simulation
  useEffect(() => {
    if (!svgRef.current || filteredNodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    // Create deep copies of nodes & links so simulation doesn't mutate constants directly
    const nodesCopy: NetworkNode[] = filteredNodes.map((d) => ({ ...d }));
    const linksCopy: NetworkLink[] = filteredLinks.map((d) => ({
      ...d,
      source: typeof d.source === "string" ? d.source : (d.source as NetworkNode).id,
      target: typeof d.target === "string" ? d.target : (d.target as NetworkNode).id
    }));

    // Main Zoomable Canvas Group
    const g = svg.append("g").attr("class", "graph-content");

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Force Simulation Setup
    const simulation = d3.forceSimulation<NetworkNode>(nodesCopy)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(linksCopy).id((d) => d.id).distance(120).strength(0.6))
      .force("charge", d3.forceManyBody().strength(-360))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => (d.influenceScore || 8) * 4.5 + 16))
      .alphaDecay(0.025);

    // Arrow markers for directed influence
    const defs = svg.append("defs");
    ["sponsors", "opposes_litigates", "lobbies_for", "oversight_amends", "default"].forEach((type) => {
      defs.append("marker")
        .attr("id", `arrow-${type}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 26)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", getLinkColor(type));
    });

    // Draw Links
    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linksCopy)
      .enter()
      .append("line")
      .attr("stroke", (d) => getLinkColor(d.relationship))
      .attr("stroke-width", (d) => (d.relationship === "sponsors" || d.relationship === "opposes_litigates" ? 2.5 : 1.8))
      .attr("stroke-dasharray", (d) => (d.relationship === "opposes_litigates" ? "4 3" : "none"))
      .attr("stroke-opacity", 0.65)
      .attr("marker-end", (d) => `url(#arrow-${d.relationship})`);

    // Draw Nodes
    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodesCopy)
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .call(
        d3.drag<SVGGElement, NetworkNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (event, d) => {
        setSelectedNode(d);
        if (onSelectNode) onSelectNode(d);
      });

    // Node outer halo on hover/select
    node.append("circle")
      .attr("r", (d) => d.influenceScore * 2.4 + 14)
      .attr("fill", (d) => getNodeColor(d.type).fill)
      .attr("fill-opacity", 0.18)
      .attr("stroke", (d) => getNodeColor(d.type).stroke)
      .attr("stroke-width", 1.5);

    // Node core circle
    node.append("circle")
      .attr("r", (d) => d.influenceScore * 1.8 + 8)
      .attr("fill", (d) => getNodeColor(d.type).fill)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .attr("class", "transition-transform duration-150");

    // Node Emoji / Symbol
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "11px")
      .text((d) => getNodeColor(d.type).icon);

    // Node Label
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.influenceScore * 2.4 + 26)
      .attr("fill", "#0f172a")
      .attr("font-weight", 700)
      .attr("font-size", "10.5px")
      .attr("class", "pointer-events-none drop-shadow-xs")
      .text((d) => d.name.length > 22 ? d.name.slice(0, 20) + "..." : d.name);

    // Node Role Subtitle
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.influenceScore * 2.4 + 38)
      .attr("fill", "#64748b")
      .attr("font-weight", 500)
      .attr("font-size", "9px")
      .attr("class", "pointer-events-none")
      .text((d) => d.roleOrCategory);

    // Hover Highlight Interactions
    node.on("mouseover", (event, d) => {
      // Highlight 1st degree neighbors
      const neighborIds = new Set<string>();
      neighborIds.add(d.id);

      linksCopy.forEach((l) => {
        const srcId = typeof l.source === "object" ? (l.source as NetworkNode).id : l.source;
        const tgtId = typeof l.target === "object" ? (l.target as NetworkNode).id : l.target;
        if (srcId === d.id) neighborIds.add(tgtId);
        if (tgtId === d.id) neighborIds.add(srcId);
      });

      node.style("opacity", (n) => (neighborIds.has(n.id) ? 1 : 0.25));
      link.style("opacity", (l) => {
        const srcId = typeof l.source === "object" ? (l.source as NetworkNode).id : l.source;
        const tgtId = typeof l.target === "object" ? (l.target as NetworkNode).id : l.target;
        return srcId === d.id || tgtId === d.id ? 1 : 0.1;
      });
    });

    node.on("mouseout", () => {
      node.style("opacity", 1);
      link.style("opacity", 0.65);
    });

    // Simulation Tick Updates
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions, filteredNodes, filteredLinks]);

  // Connected links for selected node
  const selectedNodeLinks = useMemo(() => {
    if (!selectedNode) return [];
    return NETWORK_LINKS.filter((l) => {
      const srcId = typeof l.source === "string" ? l.source : l.source.id;
      const tgtId = typeof l.target === "string" ? l.target : l.target.id;
      return srcId === selectedNode.id || tgtId === selectedNode.id;
    }).map((l) => {
      const isSource = (typeof l.source === "string" ? l.source : l.source.id) === selectedNode.id;
      const otherNodeId = isSource
        ? (typeof l.target === "string" ? l.target : l.target.id)
        : (typeof l.source === "string" ? l.source : l.source.id);
      const otherNode = NETWORK_NODES.find((n) => n.id === otherNodeId);
      return {
        ...l,
        otherNode,
        direction: isSource ? "outgoing" : "incoming"
      };
    });
  }, [selectedNode]);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden ${className}`} id="policy-influence-network-graph">
      
      {/* Top Header & Filter Controls Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/80 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1.5 border border-blue-200">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              D3 Interactive Policy & Lobbying Network
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Political, Legislative & Special Interest Power Graph
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Map the lobbying coalitions, sponsor relationships, and public interest litigation shaping Kenyan public policy and Article 201 compliance.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search politician, bill, or lobby..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold mr-1 flex items-center gap-1 text-[11px]">
              <Filter className="w-3.5 h-3.5" /> Filter Nodes:
            </span>
            {[
              { id: "all", label: "All Entities", icon: "🌐", count: NETWORK_NODES.length },
              { id: "politician", label: "Politicians & CSs", icon: "👔", count: NETWORK_NODES.filter(n => n.type === "politician").length },
              { id: "policy", label: "Policies & Bills", icon: "📜", count: NETWORK_NODES.filter(n => n.type === "policy").length },
              { id: "lobby", label: "Lobbies & Unions", icon: "🏢", count: NETWORK_NODES.filter(n => n.type === "lobby").length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                  filterType === tab.id
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Relationship Color Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Sponsors
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Lobbies For
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Opposes / Litigates
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Oversight
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Canvas & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[520px]">
        
        {/* D3 Simulation Canvas Container (8 cols) */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative bg-slate-950/95 overflow-hidden flex items-center justify-center"
        >
          {/* Zoom Instruction Tag */}
          <div className="absolute top-3 left-3 z-10 bg-slate-900/90 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-700 pointer-events-none flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Interactive: Drag nodes • Scroll to Zoom • Click to Inspect</span>
          </div>

          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Selected Entity Inspector Drawer Panel (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-5 flex flex-col justify-between overflow-y-auto max-h-[540px]">
          {selectedNode ? (
            <div className="space-y-4">
              
              {/* Header */}
              <div className="space-y-1.5 pb-3 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded border ${getNodeColor(selectedNode.type).bg}`}>
                    {selectedNode.type.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Influence: <strong className="text-slate-900 font-black">{selectedNode.influenceScore}/10</strong>
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>{getNodeColor(selectedNode.type).icon}</span>
                  <span>{selectedNode.name}</span>
                </h4>
                <p className="text-xs font-semibold text-slate-500">
                  {selectedNode.roleOrCategory} {selectedNode.jurisdiction ? `• ${selectedNode.jurisdiction}` : ""}
                </p>
              </div>

              {/* Short Summary */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {selectedNode.shortSummary}
              </div>

              {/* Detailed Mandate & Stance */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-1">
                    Institutional Mandate & Scope:
                  </span>
                  <p className="text-slate-600 leading-snug">
                    {selectedNode.detailedBio}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/80">
                  <span className="font-bold text-blue-900 text-[11px] block mb-0.5">
                    Key Policy Stance:
                  </span>
                  <p className="text-blue-800 text-[11.5px] leading-snug">
                    "{selectedNode.keyStance}"
                  </p>
                </div>
              </div>

              {/* Connected Stakeholders & Legislative Ties */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Connected Stakeholders ({selectedNodeLinks.length})
                  </span>
                  <span className="text-2xs font-mono text-slate-400">Article 118 Ties</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedNodeLinks.map((link, idx) => (
                    <div
                      key={idx}
                      onClick={() => link.otherNode && setSelectedNode(link.otherNode)}
                      className="p-2 bg-white rounded-lg border border-slate-200 hover:border-blue-400 transition-colors text-xs space-y-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <span>{link.otherNode ? getNodeColor(link.otherNode.type).icon : "•"}</span>
                          <span>{link.otherNode?.name}</span>
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          link.relationship === "sponsors"
                            ? "bg-emerald-100 text-emerald-800"
                            : link.relationship === "opposes_litigates"
                            ? "bg-rose-100 text-rose-800"
                            : link.relationship === "lobbies_for"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {link.relationship.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {link.description}
                      </p>
                      {link.financialStake && (
                        <div className="text-[10px] font-mono text-emerald-700 font-bold">
                          Stake: {link.financialStake}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-400 space-y-2">
              <Users className="w-8 h-8 opacity-40" />
              <p className="text-xs font-semibold">Select any node on the graph to inspect its lobbying footprint and legislative connections.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
