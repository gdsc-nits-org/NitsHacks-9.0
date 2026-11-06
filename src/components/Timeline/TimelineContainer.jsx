
import React, { useState, useCallback, useMemo } from 'react';

import TimelineHeader from './TimelineHeader';
import CosmicTrack from './CosmicTrack';
import TimelineList from './TimelineList';

import Modal from '../UI/Modal';
import MilestoneCard from './MilestoneCard';

import { TIMELINE_STAGES } from '../../data/timelineData';

import {
  Award,
  Clock,
  Users,
  MapPin,
} from 'lucide-react';

export default function TimelineContainer({
  activeView = 'track',
}) {
  const [selectedStageId, setSelectedStageId] = useState(null);

  // Always get the latest stage data from the main timeline data.
  const selectedStage = useMemo(() => {
    if (!selectedStageId) return null;

    return (
      TIMELINE_STAGES.find(
        (stage) => stage.id === selectedStageId
      ) ?? null
    );
  }, [selectedStageId]);

  // Open mission briefing.
  const handleSelectStage = useCallback((stage) => {
    if (!stage?.id) return;

    setSelectedStageId(stage.id);
  }, []);

  // Close mission briefing.
  const handleCloseModal = useCallback(() => {
    setSelectedStageId(null);
  }, []);

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        flex flex-col
        justify-between
        overflow-hidden
        bg-transparent
      "
    >
      {/* HEADER */}
      <TimelineHeader
        stages={TIMELINE_STAGES}
        selectedStageId={selectedStageId}
        onSelectStage={handleSelectStage}
      />

      {/* MAIN CONTENT */}
      <main
        className="
          relative
          z-10
          flex-1
          w-full
          flex flex-col
          justify-center
        "
      >
        {activeView === 'track' ? (
          <CosmicTrack
            stages={TIMELINE_STAGES}
            onSelectStage={handleSelectStage}
            selectedStageId={selectedStageId}
          />
        ) : (
          <TimelineList
            stages={TIMELINE_STAGES}
            onSelectStage={handleSelectStage}
            selectedStageId={selectedStageId}
          />
        )}
      </main>

      {/* MISSION STATISTICS */}
      <footer
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          w-full
          px-4
          py-8
        "
      >
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-3 sm:gap-4
            p-4
            rounded-2xl
            bg-slate-900/80
            border border-slate-800/80
            backdrop-blur-xl
          "
        >
          {/* TOTAL BOUNTY POOL */}
          <div className="flex items-center gap-3 p-2">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-amber-500/10
                border border-amber-500/20
                flex items-center justify-center
                text-amber-400
                shrink-0
              "
            >
              <Award className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-tech uppercase text-slate-400">
                Total Bounty Pool
              </div>

              <div className="text-base sm:text-lg font-bold font-mono text-white">
                INR 1,50,000+
              </div>
            </div>
          </div>

          {/* SPRINT DURATION */}
          <div className="flex items-center gap-3 p-2">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-purple-500/10
                border border-purple-500/20
                flex items-center justify-center
                text-purple-400
                shrink-0
              "
            >
              <Clock className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-tech uppercase text-slate-400">
                Sprint Duration
              </div>

              <div className="text-base sm:text-lg font-bold font-mono text-white">
                36 Hours Non-Stop
              </div>
            </div>
          </div>

          {/* FINALIST TEAMS */}
          <div className="flex items-center gap-3 p-2">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-sky-500/10
                border border-sky-500/20
                flex items-center justify-center
                text-sky-400
                shrink-0
              "
            >
              <Users className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-tech uppercase text-slate-400">
                Finalist Strike Teams
              </div>

              <div className="text-base sm:text-lg font-bold font-mono text-white">
                Top 60 Selected
              </div>
            </div>
          </div>

          {/* MISSION BASE */}
          <div className="flex items-center gap-3 p-2">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-emerald-500/10
                border border-emerald-500/20
                flex items-center justify-center
                text-emerald-400
                shrink-0
              "
            >
              <MapPin className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-tech uppercase text-slate-400">
                Mission Base
              </div>

              <div className="text-base sm:text-lg font-bold font-mono text-white">
                NIT Silchar Campus
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          className="
            text-center
            text-xs
            font-mono
            text-slate-500
            mt-6
            leading-relaxed
          "
        >
          NitsHacks 9.0 © 2026 GDSC & Coding Club,
          National Institute of Technology Silchar.
        </div>
      </footer>

      {/* MISSION BRIEFING MODAL */}
      <Modal
        isOpen={Boolean(selectedStage)}
        onClose={handleCloseModal}
        accentColor={selectedStage?.accentColor}
      >
        {selectedStage && (
          <MilestoneCard
            stage={selectedStage}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
