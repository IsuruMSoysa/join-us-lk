import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { listPortalUsers, type PortalUser } from "../../lib/firestore/portalUsers";
import { createSite, getSiteById, getSites, updateSite } from "../../lib/firestore/sites";
import { type SiteDocument } from "../../types/site";
import { templateRegistry } from "../../templates/registry";
import { getSiteTemplateDefaults } from "../../templates/defaults";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";

type FormValues = {
  slug: string;
  clientId: string;
  templateId: string;
  status: "draft" | "published";
  firstName: string;
  secondName: string;
  dateTime: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  rsvpByDate: string;
  tagline: string;
  heroGreeting: string;
  heroInvite: string;
  quoteText: string;
  quoteRef: string;
  detailsTitle: string;
  detailsDateSubtitle: string;
  detailsTimeSubtitle: string;
  detailsMapLinkText: string;
  galleryTitle: string;
  mapTitle: string;
  rsvpTitle: string;
  rsvpDeadlineText: string;
  rsvpSuccessAttendingTitle: string;
  rsvpSuccessAttendingBody: string;
  rsvpSuccessDeclinedTitle: string;
  rsvpSuccessDeclinedBody: string;
  invitePromptNameLabel: string;
  invitePromptAttendanceLabel: string;
  invitePromptAttendYesLabel: string;
  invitePromptAttendNoLabel: string;
  submitRsvpLabel: string;
  mapEmbedSrc: string;
  eventLogoUrl: string;
  backgroundTextureImageUrl: string;
  galleryImages: Array<{ url: string }>;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  metadataTitle: string;
  invalidInviteTitle: string;
  showInvalidInvitePage: boolean;
  sectionHeroEnabled: boolean;
  sectionDetailsEnabled: boolean;
  sectionGalleryEnabled: boolean;
  sectionMapEnabled: boolean;
  sectionRsvpEnabled: boolean;
  sectionRsvpRequiresValidInvite: boolean;
};

type SiteOption = SiteDocument & { id: string };

function toDatetimeLocalValue(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const offsetMs = parsed.getTimezoneOffset() * 60_000;
  return new Date(parsed.getTime() - offsetMs).toISOString().slice(0, 16);
}

function toStoredDatetimeValue(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString();
}

export function SiteFormPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const templateOptions = useMemo(() => Object.values(templateRegistry), []);
  const defaultTemplateId = templateOptions[0]?.id ?? "wedding-classic";
  const initialTemplateDefaults = useMemo(
    () => getSiteTemplateDefaults(defaultTemplateId),
    [defaultTemplateId],
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      templateId: defaultTemplateId,
      status: "draft",
      firstName: initialTemplateDefaults.content.names.first,
      secondName: initialTemplateDefaults.content.names.second,
      dateTime: toDatetimeLocalValue(initialTemplateDefaults.content.eventDateTime),
      eventTime: initialTemplateDefaults.content.eventTime,
      venueName: initialTemplateDefaults.content.venueName,
      venueAddress: initialTemplateDefaults.content.venueAddress,
      rsvpByDate: initialTemplateDefaults.content.rsvpByDate,
      tagline: initialTemplateDefaults.content.tagline,
      heroGreeting: initialTemplateDefaults.content.heroGreeting,
      heroInvite: initialTemplateDefaults.content.heroInvite,
      quoteText: initialTemplateDefaults.content.quoteText,
      quoteRef: initialTemplateDefaults.content.quoteRef,
      detailsTitle: initialTemplateDefaults.content.detailsTitle,
      detailsDateSubtitle: initialTemplateDefaults.content.detailsDateSubtitle,
      detailsTimeSubtitle: initialTemplateDefaults.content.detailsTimeSubtitle,
      detailsMapLinkText: initialTemplateDefaults.content.detailsMapLinkText,
      galleryTitle: initialTemplateDefaults.content.galleryTitle,
      mapTitle: initialTemplateDefaults.content.mapTitle,
      rsvpTitle: initialTemplateDefaults.content.rsvpTitle,
      rsvpDeadlineText: initialTemplateDefaults.content.rsvpDeadlineText,
      rsvpSuccessAttendingTitle: initialTemplateDefaults.content.rsvpSuccessAttendingTitle,
      rsvpSuccessAttendingBody: initialTemplateDefaults.content.rsvpSuccessAttendingBody,
      rsvpSuccessDeclinedTitle: initialTemplateDefaults.content.rsvpSuccessDeclinedTitle,
      rsvpSuccessDeclinedBody: initialTemplateDefaults.content.rsvpSuccessDeclinedBody,
      invitePromptNameLabel: initialTemplateDefaults.content.invitePromptNameLabel,
      invitePromptAttendanceLabel: initialTemplateDefaults.content.invitePromptAttendanceLabel,
      invitePromptAttendYesLabel: initialTemplateDefaults.content.invitePromptAttendYesLabel,
      invitePromptAttendNoLabel: initialTemplateDefaults.content.invitePromptAttendNoLabel,
      submitRsvpLabel: initialTemplateDefaults.content.submitRsvpLabel,
      mapEmbedSrc: initialTemplateDefaults.assets.mapEmbedSrc,
      eventLogoUrl: initialTemplateDefaults.assets.eventLogoUrl ?? "",
      backgroundTextureImageUrl: initialTemplateDefaults.theme.backgroundTextureImageUrl ?? "",
      galleryImages: initialTemplateDefaults.assets.galleryImages.map((url) => ({ url })),
      primary: initialTemplateDefaults.theme.colors.primary,
      secondary: initialTemplateDefaults.theme.colors.secondary,
      accent: initialTemplateDefaults.theme.colors.accent,
      background: initialTemplateDefaults.theme.colors.background,
      text: initialTemplateDefaults.theme.colors.text,
      muted: initialTemplateDefaults.theme.colors.muted,
      metadataTitle: initialTemplateDefaults.config.metadata.title,
      invalidInviteTitle: initialTemplateDefaults.config.metadata.invalidInviteTitle,
      showInvalidInvitePage: initialTemplateDefaults.config.features.showInvalidInvitePage,
      sectionHeroEnabled:
        initialTemplateDefaults.config.sections.find((s) => s.key === "hero")?.enabled ?? true,
      sectionDetailsEnabled:
        initialTemplateDefaults.config.sections.find((s) => s.key === "details")?.enabled ?? true,
      sectionGalleryEnabled:
        initialTemplateDefaults.config.sections.find((s) => s.key === "gallery")?.enabled ?? true,
      sectionMapEnabled:
        initialTemplateDefaults.config.sections.find((s) => s.key === "map")?.enabled ?? true,
      sectionRsvpEnabled:
        initialTemplateDefaults.config.sections.find((s) => s.key === "rsvp")?.enabled ?? true,
      sectionRsvpRequiresValidInvite:
        initialTemplateDefaults.config.sections.find((s) => s.key === "rsvp")?.requiresValidInvite ??
        true,
    },
  });
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>([]);
  const [existingSites, setExistingSites] = useState<SiteOption[]>([]);
  const [loadedSite, setLoadedSite] = useState<SiteOption | null>(null);
  const [initialSlug, setInitialSlug] = useState("");
  const lastAppliedTemplateRef = useRef<string>("");
  const selectedTemplateId = watch("templateId");
  const { fields: galleryImageFields, append: appendGalleryImage, remove: removeGalleryImage } =
    useFieldArray({
      control,
      name: "galleryImages",
    });

  const existingSlugSet = useMemo(() => {
    return new Set(
      existingSites
        .filter((site) => site.id !== siteId)
        .map((site) => site.slug.trim().toLowerCase()),
    );
  }, [existingSites, siteId]);

  useEffect(() => {
    void Promise.all([listPortalUsers(), getSites()]).then(([loadedPortalUsers, loadedSites]) => {
      setPortalUsers(loadedPortalUsers);
      setExistingSites(loadedSites);
    });
  }, []);

  const approvedPortalUsers = useMemo(
    () => portalUsers.filter((user) => user.approved),
    [portalUsers],
  );

  useEffect(() => {
    if (!siteId) {
      setInitialSlug("");
      setLoadedSite(null);
      return;
    }
    void getSiteById(siteId).then((site) => {
      if (!site) return;
      setLoadedSite(site);
      lastAppliedTemplateRef.current = site.templateId;
      setInitialSlug(site.slug.trim().toLowerCase());
      reset({
        slug: site.slug,
        clientId: site.clientId,
        templateId: site.templateId,
        status: site.status,
        firstName: site.content.names.first,
        secondName: site.content.names.second,
        dateTime: toDatetimeLocalValue(site.content.eventDateTime),
        eventTime: site.content.eventTime,
        venueName: site.content.venueName,
        venueAddress: site.content.venueAddress,
        rsvpByDate: site.content.rsvpByDate,
        tagline: site.content.tagline,
        heroGreeting: site.content.heroGreeting,
        heroInvite: site.content.heroInvite,
        quoteText: site.content.quoteText,
        quoteRef: site.content.quoteRef,
        detailsTitle: site.content.detailsTitle,
        detailsDateSubtitle: site.content.detailsDateSubtitle,
        detailsTimeSubtitle: site.content.detailsTimeSubtitle,
        detailsMapLinkText: site.content.detailsMapLinkText,
        galleryTitle: site.content.galleryTitle,
        mapTitle: site.content.mapTitle,
        rsvpTitle: site.content.rsvpTitle,
        rsvpDeadlineText: site.content.rsvpDeadlineText,
        rsvpSuccessAttendingTitle: site.content.rsvpSuccessAttendingTitle,
        rsvpSuccessAttendingBody: site.content.rsvpSuccessAttendingBody,
        rsvpSuccessDeclinedTitle: site.content.rsvpSuccessDeclinedTitle,
        rsvpSuccessDeclinedBody: site.content.rsvpSuccessDeclinedBody,
        invitePromptNameLabel: site.content.invitePromptNameLabel,
        invitePromptAttendanceLabel: site.content.invitePromptAttendanceLabel,
        invitePromptAttendYesLabel: site.content.invitePromptAttendYesLabel,
        invitePromptAttendNoLabel: site.content.invitePromptAttendNoLabel,
        submitRsvpLabel: site.content.submitRsvpLabel,
        mapEmbedSrc: site.assets.mapEmbedSrc,
        eventLogoUrl: site.assets.eventLogoUrl ?? "",
        backgroundTextureImageUrl: site.theme.backgroundTextureImageUrl ?? "",
        galleryImages: site.assets.galleryImages.map((url) => ({ url })),
        primary: site.theme.colors.primary,
        secondary: site.theme.colors.secondary,
        accent: site.theme.colors.accent,
        background: site.theme.colors.background,
        text: site.theme.colors.text,
        muted: site.theme.colors.muted,
        metadataTitle: site.config.metadata.title,
        invalidInviteTitle: site.config.metadata.invalidInviteTitle,
        showInvalidInvitePage: site.config.features.showInvalidInvitePage,
        sectionHeroEnabled: site.config.sections.find((s) => s.key === "hero")?.enabled ?? true,
        sectionDetailsEnabled:
          site.config.sections.find((s) => s.key === "details")?.enabled ?? true,
        sectionGalleryEnabled:
          site.config.sections.find((s) => s.key === "gallery")?.enabled ?? true,
        sectionMapEnabled: site.config.sections.find((s) => s.key === "map")?.enabled ?? true,
        sectionRsvpEnabled: site.config.sections.find((s) => s.key === "rsvp")?.enabled ?? true,
        sectionRsvpRequiresValidInvite:
          site.config.sections.find((s) => s.key === "rsvp")?.requiresValidInvite ?? true,
      });
    });
  }, [siteId, reset]);

  useEffect(() => {
    if (siteId) return;
    const templateId = selectedTemplateId || defaultTemplateId;
    if (!templateId || lastAppliedTemplateRef.current === templateId) return;

    const defaults = getSiteTemplateDefaults(templateId);
    const currentValues = getValues();
    reset({
      ...currentValues,
      templateId,
      firstName: defaults.content.names.first,
      secondName: defaults.content.names.second,
      dateTime: toDatetimeLocalValue(defaults.content.eventDateTime),
      eventTime: defaults.content.eventTime,
      venueName: defaults.content.venueName,
      venueAddress: defaults.content.venueAddress,
      rsvpByDate: defaults.content.rsvpByDate,
      tagline: defaults.content.tagline,
      heroGreeting: defaults.content.heroGreeting,
      heroInvite: defaults.content.heroInvite,
      quoteText: defaults.content.quoteText,
      quoteRef: defaults.content.quoteRef,
      detailsTitle: defaults.content.detailsTitle,
      detailsDateSubtitle: defaults.content.detailsDateSubtitle,
      detailsTimeSubtitle: defaults.content.detailsTimeSubtitle,
      detailsMapLinkText: defaults.content.detailsMapLinkText,
      galleryTitle: defaults.content.galleryTitle,
      mapTitle: defaults.content.mapTitle,
      rsvpTitle: defaults.content.rsvpTitle,
      rsvpDeadlineText: defaults.content.rsvpDeadlineText,
      rsvpSuccessAttendingTitle: defaults.content.rsvpSuccessAttendingTitle,
      rsvpSuccessAttendingBody: defaults.content.rsvpSuccessAttendingBody,
      rsvpSuccessDeclinedTitle: defaults.content.rsvpSuccessDeclinedTitle,
      rsvpSuccessDeclinedBody: defaults.content.rsvpSuccessDeclinedBody,
      invitePromptNameLabel: defaults.content.invitePromptNameLabel,
      invitePromptAttendanceLabel: defaults.content.invitePromptAttendanceLabel,
      invitePromptAttendYesLabel: defaults.content.invitePromptAttendYesLabel,
      invitePromptAttendNoLabel: defaults.content.invitePromptAttendNoLabel,
      submitRsvpLabel: defaults.content.submitRsvpLabel,
      mapEmbedSrc: defaults.assets.mapEmbedSrc,
      eventLogoUrl: defaults.assets.eventLogoUrl ?? "",
      backgroundTextureImageUrl: defaults.theme.backgroundTextureImageUrl ?? "",
      galleryImages: defaults.assets.galleryImages.map((url) => ({ url })),
      primary: defaults.theme.colors.primary,
      secondary: defaults.theme.colors.secondary,
      accent: defaults.theme.colors.accent,
      background: defaults.theme.colors.background,
      text: defaults.theme.colors.text,
      muted: defaults.theme.colors.muted,
      metadataTitle: defaults.config.metadata.title,
      invalidInviteTitle: defaults.config.metadata.invalidInviteTitle,
      showInvalidInvitePage: defaults.config.features.showInvalidInvitePage,
      sectionHeroEnabled: defaults.config.sections.find((s) => s.key === "hero")?.enabled ?? true,
      sectionDetailsEnabled: defaults.config.sections.find((s) => s.key === "details")?.enabled ?? true,
      sectionGalleryEnabled: defaults.config.sections.find((s) => s.key === "gallery")?.enabled ?? true,
      sectionMapEnabled: defaults.config.sections.find((s) => s.key === "map")?.enabled ?? true,
      sectionRsvpEnabled: defaults.config.sections.find((s) => s.key === "rsvp")?.enabled ?? true,
      sectionRsvpRequiresValidInvite:
        defaults.config.sections.find((s) => s.key === "rsvp")?.requiresValidInvite ?? true,
    });
    lastAppliedTemplateRef.current = templateId;
  }, [siteId, selectedTemplateId, defaultTemplateId, getValues, reset]);

  const colorFields: Array<{ name: keyof FormValues; label: string }> = [
    { name: "primary", label: "Primary color" },
    { name: "secondary", label: "Secondary color" },
    { name: "accent", label: "Accent color" },
    { name: "background", label: "Background color" },
    { name: "text", label: "Text color" },
    { name: "muted", label: "Muted color" },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{siteId ? "Edit Site" : "Create Site"}</h1>
        <Link
          to="/admin/portal-users"
          className="text-sm px-3 py-2 rounded-xl border border-secondary/20 hover:text-secondary"
        >
          Manage Portal User Approvals
        </Link>
      </div>
      <form
        className="glass p-6 rounded-3xl grid md:grid-cols-2 gap-4"
        onSubmit={handleSubmit(async (values) => {
          const normalizedSlug = values.slug.trim().toLowerCase();
          const usingExistingTemplateData =
            Boolean(siteId) &&
            Boolean(loadedSite) &&
            loadedSite.templateId === values.templateId;
          const templateDefaults = usingExistingTemplateData
            ? getSiteTemplateDefaults(defaultTemplateId)
            : getSiteTemplateDefaults(values.templateId || defaultTemplateId);
          const baseContent = usingExistingTemplateData
            ? loadedSite!.content
            : templateDefaults.content;
          const baseConfig = usingExistingTemplateData
            ? loadedSite!.config
            : templateDefaults.config;
          const baseTheme = usingExistingTemplateData
            ? loadedSite!.theme
            : templateDefaults.theme;
          const baseAssets = usingExistingTemplateData
            ? loadedSite!.assets
            : templateDefaults.assets;
          const payload: SiteDocument = {
            slug: normalizedSlug,
            templateId: values.templateId,
            clientId: values.clientId,
            status: values.status,
            content: {
              ...baseContent,
              names: { first: values.firstName, second: values.secondName },
              eventDateTime: toStoredDatetimeValue(values.dateTime),
              eventTime: values.eventTime,
              venueName: values.venueName,
              venueAddress: values.venueAddress,
              rsvpByDate: values.rsvpByDate,
              tagline: values.tagline,
              heroGreeting: values.heroGreeting,
              heroInvite: values.heroInvite,
              quoteText: values.quoteText,
              quoteRef: values.quoteRef,
              detailsTitle: values.detailsTitle,
              detailsDateSubtitle: values.detailsDateSubtitle,
              detailsTimeSubtitle: values.detailsTimeSubtitle,
              detailsMapLinkText: values.detailsMapLinkText,
              galleryTitle: values.galleryTitle,
              mapTitle: values.mapTitle,
              rsvpTitle: values.rsvpTitle,
              rsvpDeadlineText: values.rsvpDeadlineText,
              rsvpSuccessAttendingTitle: values.rsvpSuccessAttendingTitle,
              rsvpSuccessAttendingBody: values.rsvpSuccessAttendingBody,
              rsvpSuccessDeclinedTitle: values.rsvpSuccessDeclinedTitle,
              rsvpSuccessDeclinedBody: values.rsvpSuccessDeclinedBody,
              invitePromptNameLabel: values.invitePromptNameLabel,
              invitePromptAttendanceLabel: values.invitePromptAttendanceLabel,
              invitePromptAttendYesLabel: values.invitePromptAttendYesLabel,
              invitePromptAttendNoLabel: values.invitePromptAttendNoLabel,
              submitRsvpLabel: values.submitRsvpLabel,
            },
            theme: {
              ...baseTheme,
              colors: {
                ...baseTheme.colors,
                primary: values.primary,
                secondary: values.secondary,
                accent: values.accent,
                background: values.background,
                text: values.text,
                muted: values.muted,
              },
              backgroundTextureImageUrl: values.backgroundTextureImageUrl.trim(),
            },
            config: {
              ...baseConfig,
              metadata: {
                ...baseConfig.metadata,
                title: values.metadataTitle,
                invalidInviteTitle: values.invalidInviteTitle,
              },
              features: {
                ...baseConfig.features,
                showInvalidInvitePage: values.showInvalidInvitePage,
              },
              sections: [
                { key: "hero", enabled: values.sectionHeroEnabled },
                { key: "details", enabled: values.sectionDetailsEnabled },
                { key: "gallery", enabled: values.sectionGalleryEnabled },
                { key: "map", enabled: values.sectionMapEnabled },
                {
                  key: "rsvp",
                  enabled: values.sectionRsvpEnabled,
                  requiresValidInvite: values.sectionRsvpRequiresValidInvite,
                },
              ],
            },
            assets: {
              ...baseAssets,
              mapEmbedSrc: values.mapEmbedSrc,
              eventLogoUrl: values.eventLogoUrl.trim() || undefined,
              galleryImages: values.galleryImages
                .map((image) => image.url.trim())
                .filter((image) => image.length > 0),
            },
          };

          try {
            if (siteId) {
              await updateSite(siteId, payload);
            } else {
              await createSite(payload);
            }
            toast.success(siteId ? "Site updated." : "Site created.");
            navigate("/admin/sites");
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to save site.");
          }
        })}
      >
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Site Setup</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="site-slug-input">
            Site slug
          </label>
          <input
            id="site-slug-input"
            {...register("slug", {
              required: "Site slug is required.",
              pattern: {
                value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: "Use lowercase letters, numbers, and hyphens only.",
              },
              validate: (value) => {
                const normalized = value.trim().toLowerCase();
                if (!normalized) return "Site slug is required.";
                if (normalized === initialSlug) return true;
                return existingSlugSet.has(normalized) ? "This slug already exists." : true;
              },
            })}
            placeholder="Site slug"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          {errors.slug ? <p className="text-sm text-red-600">{errors.slug.message}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="site-template-select">
            Template
          </label>
          <select
            id="site-template-select"
            {...register("templateId", { required: "Template is required." })}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          >
            <option value="" disabled>
              Select template
            </option>
            {templateOptions.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          {errors.templateId ? <p className="text-sm text-red-600">{errors.templateId.message}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="client-id-select">
            Portal user
          </label>
          <select
            id="client-id-select"
            {...register("clientId", { required: "Portal user is required." })}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          >
            <option value="">Select approved portal user</option>
            {approvedPortalUsers.map((user) => (
              <option key={user.uid} value={user.uid}>
                {user.displayName} ({user.email || user.uid})
              </option>
            ))}
          </select>
          {errors.clientId ? <p className="text-sm text-red-600">{errors.clientId.message}</p> : null}
          {approvedPortalUsers.length === 0 ? (
            <p className="text-xs text-text/70">
              No approved portal users found. Approve users in{" "}
              <Link to="/admin/portal-users" className="underline">
                Portal Users
              </Link>
              .
            </p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="first-name-input">
            First name
          </label>
          <input
            id="first-name-input"
            {...register("firstName", { required: "First name is required." })}
            placeholder="First name"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          {errors.firstName ? <p className="text-sm text-red-600">{errors.firstName.message}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="second-name-input">
            Second name
          </label>
          <input
            id="second-name-input"
            {...register("secondName", { required: "Second name is required." })}
            placeholder="Second name"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          {errors.secondName ? <p className="text-sm text-red-600">{errors.secondName.message}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="event-datetime-input">
            Event date and time
          </label>
          <input
            id="event-datetime-input"
            type="datetime-local"
            {...register("dateTime", { required: "Event date and time is required." })}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          {errors.dateTime ? <p className="text-sm text-red-600">{errors.dateTime.message}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="venue-name-input">
            Venue name
          </label>
          <input
            id="venue-name-input"
            {...register("venueName")}
            placeholder="Venue name"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="venue-address-input">
            Venue address
          </label>
          <input
            id="venue-address-input"
            {...register("venueAddress")}
            placeholder="Venue address"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="event-time-input">
            Event time label
          </label>
          <input
            id="event-time-input"
            {...register("eventTime")}
            placeholder="Event time label (e.g. 09:30 AM)"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-by-date-input">
            RSVP by date
          </label>
          <input
            id="rsvp-by-date-input"
            {...register("rsvpByDate")}
            placeholder="RSVP by date label"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="map-embed-src-input">
            Map embed/source URL
          </label>
          <input
            id="map-embed-src-input"
            {...register("mapEmbedSrc")}
            type="url"
            placeholder="Map location link"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="event-logo-url-input">
            Event logo URL (optional)
          </label>
          <input
            id="event-logo-url-input"
            {...register("eventLogoUrl")}
            type="url"
            placeholder="https://… (Union Awards / hero logo)"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          <p className="text-xs text-text/70">
            Used by the Union Awards template for the main hero logo.
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-text/80">Gallery images</label>
            <button
              type="button"
              onClick={() => appendGalleryImage({ url: "" })}
              className="px-3 py-2 rounded-xl border border-secondary/30 text-sm hover:text-secondary"
            >
              Add URL
            </button>
          </div>
          <p className="text-xs text-text/70">Paste direct image URLs in display order.</p>
          {galleryImageFields.length === 0 ? (
            <p className="text-sm text-text/70">No gallery images yet.</p>
          ) : null}
          <div className="space-y-2">
            {galleryImageFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  {...register(`galleryImages.${index}.url` as const)}
                  type="text"
                  placeholder={`Gallery image path or URL ${index + 1}`}
                  className="flex-1 px-4 py-3 rounded-xl border border-secondary/20 bg-background"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="px-3 py-2 rounded-xl border border-secondary/20 text-sm hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Content</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="tagline-input">
            Tagline
          </label>
          <textarea
            id="tagline-input"
            {...register("tagline")}
            placeholder="Tagline"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="hero-greeting-input">
            Hero greeting
          </label>
          <textarea
            id="hero-greeting-input"
            {...register("heroGreeting")}
            placeholder="Hero greeting"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="hero-invite-input">
            Hero invite text
          </label>
          <textarea
            id="hero-invite-input"
            {...register("heroInvite")}
            placeholder="Hero invite text"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="quote-text-input">
            Quote text
          </label>
          <textarea
            id="quote-text-input"
            {...register("quoteText")}
            placeholder="Quote text"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="quote-ref-input">
            Quote reference
          </label>
          <input
            id="quote-ref-input"
            {...register("quoteRef")}
            placeholder="Quote reference"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="details-title-input">
            Details section title
          </label>
          <input
            id="details-title-input"
            {...register("detailsTitle")}
            placeholder="Details section title"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="details-date-subtitle-input">
            Details date subtitle
          </label>
          <input
            id="details-date-subtitle-input"
            {...register("detailsDateSubtitle")}
            placeholder="Details date subtitle"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="details-time-subtitle-input">
            Details time subtitle
          </label>
          <input
            id="details-time-subtitle-input"
            {...register("detailsTimeSubtitle")}
            placeholder="Details time subtitle"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="details-map-link-text-input">
            Details map link text
          </label>
          <input
            id="details-map-link-text-input"
            {...register("detailsMapLinkText")}
            placeholder="Details map link text"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="gallery-title-input">
            Gallery title
          </label>
          <input
            id="gallery-title-input"
            {...register("galleryTitle")}
            placeholder="Gallery title"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="map-title-input">
            Map title
          </label>
          <input
            id="map-title-input"
            {...register("mapTitle")}
            placeholder="Map title"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-title-input">
            RSVP title
          </label>
          <input
            id="rsvp-title-input"
            {...register("rsvpTitle")}
            placeholder="RSVP title"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-deadline-text-input">
            RSVP deadline text
          </label>
          <input
            id="rsvp-deadline-text-input"
            {...register("rsvpDeadlineText")}
            placeholder="RSVP deadline text"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="invite-prompt-name-label-input">
            RSVP name prompt label
          </label>
          <input
            id="invite-prompt-name-label-input"
            {...register("invitePromptNameLabel")}
            placeholder="RSVP name prompt label"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="invite-prompt-attendance-label-input">
            RSVP attendance prompt label
          </label>
          <input
            id="invite-prompt-attendance-label-input"
            {...register("invitePromptAttendanceLabel")}
            placeholder="RSVP attendance prompt label"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="invite-prompt-attend-yes-label-input">
            RSVP yes label
          </label>
          <input
            id="invite-prompt-attend-yes-label-input"
            {...register("invitePromptAttendYesLabel")}
            placeholder="RSVP yes label"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="invite-prompt-attend-no-label-input">
            RSVP no label
          </label>
          <input
            id="invite-prompt-attend-no-label-input"
            {...register("invitePromptAttendNoLabel")}
            placeholder="RSVP no label"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="submit-rsvp-label-input">
            RSVP submit button label
          </label>
          <input
            id="submit-rsvp-label-input"
            {...register("submitRsvpLabel")}
            placeholder="RSVP submit button label"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-success-attending-title-input">
            RSVP success (attending) title
          </label>
          <input
            id="rsvp-success-attending-title-input"
            {...register("rsvpSuccessAttendingTitle")}
            placeholder="RSVP success (attending) title"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-success-attending-body-input">
            RSVP success (attending) body
          </label>
          <textarea
            id="rsvp-success-attending-body-input"
            {...register("rsvpSuccessAttendingBody")}
            placeholder="RSVP success (attending) body"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-success-declined-title-input">
            RSVP success (declined) title
          </label>
          <input
            id="rsvp-success-declined-title-input"
            {...register("rsvpSuccessDeclinedTitle")}
            placeholder="RSVP success (declined) title"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-text/80" htmlFor="rsvp-success-declined-body-input">
            RSVP success (declined) body
          </label>
          <textarea
            id="rsvp-success-declined-body-input"
            {...register("rsvpSuccessDeclinedBody")}
            placeholder="RSVP success (declined) body"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="metadata-title-input">
            Site title
          </label>
          <input
            id="metadata-title-input"
            {...register("metadataTitle", { required: "Site title is required." })}
            placeholder="Wedding"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          {errors.metadataTitle ? (
            <p className="text-sm text-red-600">{errors.metadataTitle.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-text/80" htmlFor="invalid-invite-title-input">
            Invalid invite title
          </label>
          <input
            id="invalid-invite-title-input"
            {...register("invalidInviteTitle", { required: "Invalid invite title is required." })}
            placeholder="Invalid Invite"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
          {errors.invalidInviteTitle ? (
            <p className="text-sm text-red-600">{errors.invalidInviteTitle.message}</p>
          ) : null}
        </div>

        <div className="space-y-1 md:col-span-2">
          <label
            className="block text-sm font-medium text-text/80"
            htmlFor="background-texture-image-url-input"
          >
            Background texture image URL
          </label>
          <input
            id="background-texture-image-url-input"
            {...register("backgroundTextureImageUrl")}
            type="text"
            placeholder="/images/paper-2.jpg"
            className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-background"
          />
        </div>

        <label className="md:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
          <input type="checkbox" {...register("showInvalidInvitePage")} className="h-4 w-4" />
          <span className="text-sm text-foreground">Show invalid invite page</span>
        </label>

        <div className="md:col-span-2 grid md:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
            <input type="checkbox" {...register("sectionHeroEnabled")} className="h-4 w-4" />
            <span className="text-sm text-foreground">Enable Hero section</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
            <input type="checkbox" {...register("sectionDetailsEnabled")} className="h-4 w-4" />
            <span className="text-sm text-foreground">Enable Details section</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
            <input type="checkbox" {...register("sectionGalleryEnabled")} className="h-4 w-4" />
            <span className="text-sm text-foreground">Enable Gallery section</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
            <input type="checkbox" {...register("sectionMapEnabled")} className="h-4 w-4" />
            <span className="text-sm text-foreground">Enable Map section</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
            <input type="checkbox" {...register("sectionRsvpEnabled")} className="h-4 w-4" />
            <span className="text-sm text-foreground">Enable RSVP section</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
            <input type="checkbox" {...register("sectionRsvpRequiresValidInvite")} className="h-4 w-4" />
            <span className="text-sm text-foreground">RSVP requires valid invitee link</span>
          </label>
        </div>

        {colorFields.map(({ name, label }) => {
          const selectedColor = watch(name);
          return (
            <label key={name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/20 bg-background">
              <input {...register(name)} type="color" className="h-10 w-12 rounded border border-secondary/20" />
              <span className="text-sm text-foreground">{label}</span>
              <span
                aria-label={`${label} preview`}
                className="ml-auto h-8 w-8 rounded border border-secondary/20"
                style={{ backgroundColor: selectedColor || "#ffffff" }}
              />
            </label>
          );
        })}
        <Button type="submit" className="md:col-span-2 h-auto py-3 font-semibold">
          {isSubmitting ? "Saving..." : "Save Site"}
        </Button>
      </form>
    </section>
  );
}
