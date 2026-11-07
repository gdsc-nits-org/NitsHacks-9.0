
{/* ----------------- LOKI BADGE (DAY 0) ----------------- */}
{stageMap['loki'] && (
  <div
    className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
    style={{
      left: '19%',
      top: '27.5%',
    }}
  >
    <TimelineNode
      stage={stageMap['loki']}
      onSelect={onSelectStage}
    />
  </div>
)}

{/* ----------------- ULTRON BADGE (DAY 1) ----------------- */}
{stageMap['ultron'] && (
  <div
    className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
    style={{
      left: '73.5%',
      top: '27.5%',
    }}
  >
    <TimelineNode
      stage={stageMap['ultron']}
      onSelect={onSelectStage}
    />
  </div>
)}

{/* ----------------- THANOS BADGE (DAY 2) ----------------- */}
{stageMap['thanos'] && (
  <div
    className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
    style={{
      left: '26.5%',
      top: '55%',
    }}
  >
    <TimelineNode
      stage={stageMap['thanos']}
      onSelect={onSelectStage}
    />
  </div>
)}

{/* ----------------- DOCTOR DOOM BADGE (DAY 3) ----------------- */}
{stageMap['doom'] && (
  <div
    className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
    style={{
      left: '86.5%',
      top: '82.5%',
    }}
  >
    <TimelineNode
      stage={stageMap['doom']}
      onSelect={onSelectStage}
    />
  </div>
)}
