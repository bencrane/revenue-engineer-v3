# MCP Tools Usage Guide

This document explains how to use the available MCP (Model Context Protocol) tools for development on this project.

---

## Overview

MCP tools extend AI capabilities beyond basic code editing. Use them strategically for:
- Documentation lookup
- Complex reasoning
- Code pattern research
- Task management

---

## 1. Sequential Thinking (`mcp_sequential-thinking_sequentialthinking`)

**Purpose:** Break down complex problems into manageable steps with revision capability.

**When to use:**
- Multi-step architectural decisions
- Debugging complex issues
- Planning implementation approaches
- Problems where the full scope isn't clear initially

**How to use:**
```
Call with:
- thought: Current thinking step
- thoughtNumber: Current step (1, 2, 3...)
- totalThoughts: Estimated total needed (can adjust)
- nextThoughtNeeded: true if more thinking required
- isRevision: true if reconsidering previous thought
```

**Best practices:**
- Start with rough estimate, adjust as needed
- Don't hesitate to revise earlier conclusions
- Express uncertainty when present
- Generate hypothesis, verify, repeat until confident

---

## 2. Context7 (`mcp_context7_resolve-library-id` + `mcp_context7_query-docs`)

**Purpose:** Fetch up-to-date documentation for any library/framework.

**When to use:**
- Checking current API syntax
- Understanding library behavior
- Finding code examples
- Verifying best practices

**How to use:**
1. First resolve the library ID:
```
mcp_context7_resolve-library-id
- libraryName: "react" (or whatever library)
- query: "What you're trying to accomplish"
```

2. Then query the docs:
```
mcp_context7_query-docs
- libraryId: "/vercel/next.js" (from step 1)
- query: "How to set up authentication with JWT"
```

**Best practices:**
- Be specific in queries
- Don't call more than 3 times per question
- Use for ANY library-specific questions

---

## 3. Exa (`mcp_exa_web_search_exa` + `mcp_exa_get_code_context_exa`)

**Purpose:** Web search and code context retrieval.

### `mcp_exa_get_code_context_exa`
**When to use:**
- Finding code patterns for APIs, libraries, SDKs
- Getting implementation examples
- Understanding how others solved similar problems

```
- query: "React useState hook examples"
- tokensNum: 5000 (adjust 1000-50000 based on need)
```

### `mcp_exa_web_search_exa`
**When to use:**
- Real-time information needs
- Current events or recent updates
- Verifying facts

```
- query: "Your search query"
- numResults: 8 (default)
- type: "auto" | "fast" | "deep"
```

**Best practices:**
- Use `get_code_context_exa` for programming questions
- Use `web_search_exa` for general research
- Be specific with search queries

---

## 4. Taskmaster

**Purpose:** Project and task management.

**Available tools:**
- `mcp_taskmaster_get_tasks` - List all tasks
- `mcp_taskmaster_get_task` - Get specific task details
- `mcp_taskmaster_set_task_status` - Update task status
- `mcp_taskmaster_next_task` - Find next task to work on
- `mcp_taskmaster_expand_task` - Break task into subtasks
- `mcp_taskmaster_update_subtask` - Add info to subtask
- `mcp_taskmaster_parse_prd` - Generate tasks from PRD

**Status values:** pending, in-progress, done, deferred, cancelled, blocked, review

**Best practices:**
- Keep tasks updated as you work
- Use for complex multi-step projects
- Break large tasks into subtasks

---

## 5. Shadcn UI (`mcp_shadcn_*`)

**Purpose:** Search and add UI components from shadcn registry.

**Tools:**
- `mcp_shadcn_search_items_in_registries` - Find components
- `mcp_shadcn_view_items_in_registries` - View component details
- `mcp_shadcn_get_item_examples_from_registries` - Get usage examples
- `mcp_shadcn_get_add_command_for_items` - Get CLI add command

**Example workflow:**
1. Search: `{ registries: ["@shadcn"], query: "button" }`
2. View: `{ items: ["@shadcn/button"] }`
3. Get examples: `{ registries: ["@shadcn"], query: "button-demo" }`
4. Add: `{ items: ["@shadcn/button"] }`

---

## 6. Tailwind (`mcp_tailwind_*`)

**Purpose:** Tailwind CSS documentation and code search.

**Tools:**
- `fetch_tailwindcss_documentation` - Get full docs
- `search_tailwindcss_documentation` - Search docs semantically
- `search_tailwindcss_code` - Search Tailwind codebase

---

## 7. Next.js DevTools (`mcp_next-devtools_*`)

**Purpose:** Next.js development assistance. **PRIMARY source for Next.js questions.**

**Tools:**
- `nextjs_docs` - Fetch official Next.js docs (read `nextjs-docs://llms-index` resource first)
- `nextjs_index` - Discover running dev servers
- `nextjs_call` - Call MCP tools on running server (get_errors, get_routes, etc.)
- `browser_eval` - Browser automation for testing

**Note:** Requires Next.js 16+ for MCP support.

---

## 8. Figma (`mcp_figma_*`)

**Purpose:** Figma design integration.

**Tools:**
- `get_design_context` - Get UI code from Figma node
- `get_screenshot` - Screenshot Figma node
- `get_metadata` - Get node structure
- `generate_diagram` - Create diagrams in FigJam

---

## 9. Vercel (`mcp_vercel_*`)

**Purpose:** Deployment and hosting management.

**Tools:**
- `deploy_to_vercel` - Deploy current project
- `list_projects` / `get_project` - Manage projects
- `list_deployments` / `get_deployment` - View deployments
- `get_deployment_build_logs` - Debug failed deployments
- `search_vercel_documentation` - Search Vercel docs
- `check_domain_availability_and_price` - Domain management

**Current Team:** `bencrane's projects` (team_gfbQ4C6lVx8Ji9VV5iu4PxLj)

---

## 10. Firecrawl (`mcp_firecrawl_*`)

**Purpose:** Web scraping, crawling, and data extraction.

**Tools:**
- `firecrawl_scrape` - Scrape single URL (fastest, most reliable)
- `firecrawl_map` - Discover all URLs on a site
- `firecrawl_search` - Search web with optional scraping
- `firecrawl_crawl` - Crawl multiple pages
- `firecrawl_extract` - Extract structured data with LLM
- `firecrawl_agent` - Autonomous web data gathering

**Best practices:**
- Use `scrape` for single pages, `batch_scrape` for multiple
- Use `map` before crawling to discover URLs
- Add `maxAge` parameter for cached (faster) scrapes

---

## 11. Browser Automation

### Cursor Browser Extension (`mcp_cursor-browser-extension_*`)
Direct browser control for testing and verification.

**Tools:**
- `browser_navigate` / `browser_navigate_back` - Navigation
- `browser_snapshot` - Get page accessibility tree (use for interactions)
- `browser_click` / `browser_type` / `browser_hover` - Interactions
- `browser_take_screenshot` - Visual capture
- `browser_tabs` - Multi-tab management
- `browser_console_messages` - Debug console output

### Browserbase (`mcp_browserbase_*`)
Cloud browser automation with Stagehand.

**Tools:**
- `browserbase_session_create` / `browserbase_session_close` - Session management
- `browserbase_stagehand_navigate` - Navigate to URL
- `browserbase_stagehand_act` - Perform actions (click, type)
- `browserbase_stagehand_extract` - Extract data from page
- `browserbase_stagehand_observe` - Find interactive elements
- `browserbase_stagehand_agent` - Autonomous task execution

---

## 12. Additional Search (`mcp_serper_*`)

**Purpose:** Google search via Serper API.

**Tools:**
- `google_search` - Web search with rich results (organic, PAA, knowledge graph)
- `scrape` - Scrape webpage with metadata

---

## 13. Supabase (`mcp_supabase_*`) ⚠️ NEEDS CONFIG

**Purpose:** Database operations, migrations, edge functions.

**Tools:**
- `list_tables` / `execute_sql` - Database queries
- `apply_migration` / `list_migrations` - Schema management
- `deploy_edge_function` / `list_edge_functions` - Serverless functions
- `generate_typescript_types` - Type generation
- `get_logs` - Service logs

**Status:** Requires valid `project_id`. Run `npx supabase projects list` to get ID.

---

## 14. Sentry (`mcp_sentry_*`) ⚠️ NEEDS CONFIG

**Purpose:** Error tracking and monitoring.

**Tools:**
- `search_issues` / `get_issue_details` - Issue management
- `search_events` - Event queries and aggregations
- `update_issue` - Change issue status/assignment
- `get_trace_details` - Trace analysis

**Status:** 403 Permission denied. Verify API token has org access.

---

## 15. Docker (`mcp_docker_*`) ⚠️ NEEDS PATH

**Purpose:** Container management.

**Tools:**
- `create-container` - Create standalone container
- `deploy-compose` - Deploy Docker Compose stack
- `list-containers` - List all containers
- `get-logs` - Container logs

**Status:** Docker binary not on PATH. Start Docker Desktop.

---

## Priority Order for This Project

1. **Next.js DevTools** - Primary for Next.js docs and runtime debugging
2. **Sequential Thinking** - For complex debugging/architecture
3. **Exa Code Context** - For API integration patterns
4. **Shadcn** - For UI components
5. **Taskmaster** - For tracking multi-step work
6. **Context7** - For non-Next.js library documentation
7. **Vercel** - For deployment
8. **Firecrawl/Browser** - For testing and web research

---

## Anti-Patterns to Avoid

1. **Don't guess** - Use docs/Exa to verify before implementing
2. **Don't skip sequential thinking** for complex problems
3. **Don't over-call** - Max 3 calls per tool per question
4. **Don't use web search for code** - Use `get_code_context_exa` instead
5. **Don't ignore tool results** - Read and apply what you find
6. **Don't use Context7 for Next.js** - Use `next-devtools/nextjs_docs` instead

