# SDR

Bots from the Galaxy Day 2 livestream sidebar around Simon Bot (Chief of Staff). Names are the sidebar display names; the grey tag next to each is the role `title`.

```
Chief of Staff
├── Outbound: Shakespeare (Email)
├── Research: PLG Bot · Amplemarket Bot · Company Research Bot · Web Search Bot · Voice of the Customer Bot · Usage Bot
└── Simon's Army: Soldier (+ Army Huddle channel)
```

| Role | Tag | Sidebar group | Kind |
| --- | --- | --- | --- |
| Chief of Staff | | Lead (Simon Bot) | Orchestrator |
| Shakespeare | Email | Outbound | Specialist |
| PLG Bot | Salesforce | Research | Specialist |
| Amplemarket Bot | Enrichment | Research | Specialist |
| Company Research Bot | Sumble | Research | Specialist |
| Web Search Bot | Exa | Research | Specialist |
| Voice of the Customer Bot | Gong | Research | Specialist |
| Usage Bot | Databricks | Research | Specialist |
| Soldier | Simon's Army | Simon's Army | Specialist |

## Channels

| Channel | Members |
| --- | --- |
| Army Huddle | Chief of Staff, Soldier |

## Routines

| Routine | Schedule | Cron |
| --- | --- | --- |
| 50 Daily Prospects | Every day at 8:00 AM | `0 8 * * *` |
| Inbox Manager | Weekdays at 8:00 AM | `0 8 * * 1-5` |
| Accounts Signal Scan | Weekdays at 8:00 AM | `0 8 * * 1-5` |
| Sequencer Daily | Weekdays at 8:00 AM | `0 8 * * 1-5` |
| Sequencer SF Triggers | When a webhook fires | on webhook |

## Import

```
Import sdr from https://github.com/serenakeyitan/agent-org-chart
```

## Sources

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)

---

Bot names as shown on the Galaxy Day 2 livestream sidebar; personas stripped for fidelity.
