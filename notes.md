# Notes and Key Decisions

1. Database Choice
I chose "PostgreSQL" via neondb because it’s cloud-hosted, reliable, and integrates perfectly with "Prisma ORM".  
NeonDB’s auto-scaling and connection pooling make it ideal for production.

2. ORM: Prisma
I used ORM(OBJECT-RELATIONAL-Mapping) it is safe to write schema then hard writing of curd operation instead 
I used Prisma for:
1)Easy schema definition (`schema.prisma`)
2)Type-safe database queries
3)Simple migrations
4)Built-in data aggregation for insights

3. Schema Design
The `Task` model includes:
  `id` (Primary Key)
  `title`
  `description`
  `status` (`Open`, `In Progress`, `Completed`)
  `priority` (`Low`, `Medium`, `High`)
  `createdAt`
  `dueDate`

This structure supports filtering, analytics, and progress insights.

4. Smart Insights Logic
Insights are generated using "aggregated Prisma queries", such as:
1)Counting total/completed/overdue tasks
2)Comparing due dates with `new Date()`
3) Generating a human-like text summary (AI-style)

Example:
```js
if (overdueCount > 0) {
  message = `You have ${overdueCount} overdue tasks!`;
} else {
  message = `Great job! You're on track with all tasks.`;
}
