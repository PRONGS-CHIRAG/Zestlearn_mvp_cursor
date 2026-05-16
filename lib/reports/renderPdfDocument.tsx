import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { OpportunityReport } from "@/types/report";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 36,
    backgroundColor: "#ffffff",
    fontSize: 10.5,
    color: "#0f172a",
    lineHeight: 1.45,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 6,
  },
  meta: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 2,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  paragraph: {
    fontSize: 10.5,
    color: "#1f2937",
    lineHeight: 1.45,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 4,
    paddingRight: 6,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: "#e11d48",
  },
  bulletText: {
    flex: 1,
    fontSize: 10.5,
    color: "#1f2937",
    lineHeight: 1.4,
  },
  useCaseCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  useCaseTitle: {
    fontSize: 11.5,
    fontWeight: 700,
    marginBottom: 6,
    color: "#111827",
  },
  label: {
    fontWeight: 700,
    color: "#111827",
  },
  line: {
    marginBottom: 4,
    fontSize: 10,
    color: "#1f2937",
  },
  noteBox: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  smallMuted: {
    fontSize: 9.5,
    color: "#64748b",
    lineHeight: 1.4,
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});

type ReportPdfDocumentProps = {
  title: string;
  companyName: string;
  createdAt: number;
  report: OpportunityReport;
};

function BulletList({ items }: { items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function ReportPdfDocument({
  title,
  companyName,
  createdAt,
  report,
}: ReportPdfDocumentProps) {
  const createdLabel = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document
      title={title}
      author="ZestLearn"
      subject="AI Opportunity Assessment Report"
      creator="ZestLearn"
      producer="ZestLearn"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.meta}>Prepared for: {companyName}</Text>
          <Text style={styles.meta}>Generated: {createdLabel}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.paragraph}>{report.executive_summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Problem Summary</Text>
          <Text style={styles.paragraph}>{report.problem_summary}</Text>
        </View>

        {!!report.current_pain_points.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Pain Points</Text>
            <BulletList items={report.current_pain_points} />
          </View>
        )}

        {!!report.recommended_use_cases.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended AI Use Cases</Text>
            {report.recommended_use_cases.map((useCase, index) => (
              <View key={`${useCase.title}-${index}`} style={styles.useCaseCard}>
                <Text style={styles.useCaseTitle}>
                  {index + 1}. {useCase.title}
                </Text>
                <Text style={styles.line}>{useCase.description}</Text>
                <Text style={styles.line}>
                  <Text style={styles.label}>Priority Score:</Text>{" "}
                  {useCase.priority_score}/10
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.label}>Difficulty:</Text>{" "}
                  {useCase.difficulty.charAt(0).toUpperCase() +
                    useCase.difficulty.slice(1)}
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.label}>Business Value:</Text>{" "}
                  {useCase.business_value}
                </Text>

                {!!useCase.data_requirements.length && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.line}>
                      <Text style={styles.label}>Data Requirements</Text>
                    </Text>
                    <BulletList items={useCase.data_requirements} />
                  </View>
                )}

                {!!useCase.risks.length && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.line}>
                      <Text style={styles.label}>Risks</Text>
                    </Text>
                    <BulletList items={useCase.risks} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended First Pilot</Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Pilot:</Text> {report.best_first_pilot.title}
          </Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Why this first:</Text>{" "}
            {report.best_first_pilot.why_this_first}
          </Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Estimated Timeline:</Text>{" "}
            {report.best_first_pilot.estimated_timeline}
          </Text>
          {!!report.best_first_pilot.success_metrics.length && (
            <View style={{ marginTop: 4 }}>
              <Text style={styles.line}>
                <Text style={styles.label}>Success Metrics</Text>
              </Text>
              <BulletList items={report.best_first_pilot.success_metrics} />
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Business Impact</Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Efficiency Gains:</Text>{" "}
            {report.estimated_business_impact.efficiency_gains}
          </Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Cost Reduction:</Text>{" "}
            {report.estimated_business_impact.cost_reduction}
          </Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Timeline to Value:</Text>{" "}
            {report.estimated_business_impact.timeline_to_value}
          </Text>
          <View style={styles.noteBox}>
            <Text style={styles.smallMuted}>
              Note: all estimates are conservative and assumption-backed. Actual
              outcomes depend on implementation quality, data readiness, and team
              adoption.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>30 / 60 / 90 Day Roadmap</Text>
          <Text style={styles.line}>
            <Text style={styles.label}>Days 1-30: Foundation</Text>
          </Text>
          <BulletList items={report.roadmap_30_60_90.days_30} />
          <Text style={styles.line}>
            <Text style={styles.label}>Days 31-60: Build</Text>
          </Text>
          <BulletList items={report.roadmap_30_60_90.days_60} />
          <Text style={styles.line}>
            <Text style={styles.label}>Days 61-90: Scale</Text>
          </Text>
          <BulletList items={report.roadmap_30_60_90.days_90} />
        </View>

        {!!report.risks_and_constraints.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Risks and Constraints</Text>
            <BulletList items={report.risks_and_constraints} />
          </View>
        )}

        {!!report.assumptions.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assumptions</Text>
            <BulletList items={report.assumptions} />
          </View>
        )}

        {!!report.open_questions.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Open Questions</Text>
            <BulletList items={report.open_questions} />
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.smallMuted}>
            This report was generated by ZestLearn AI and should be reviewed by
            domain experts before acting on recommendations.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
