
import React from 'react';
import { CheckSquare, Settings, AlertTriangle, HelpCircle, Gift, TrendingUp, Monitor, Gamepad2, Video, Globe, Clock, Info, Coffee } from 'lucide-react';

export const GuideTab: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full p-4 pb-24 animate-in fade-in duration-500">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Content Column */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 p-6 rounded-xl border border-stone-700 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">General Guide</h1>
            <p className="text-stone-400 text-sm md:text-base italic">
              Introduction
            </p>
            <p className="text-stone-300 text-sm md:text-base mt-2">
              This guide focuses on efficiency, scaling, and input precision. It is written for players who want to optimize their account long term instead of guessing or over-farming.
            </p>
          </div>

          {/* Scope */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-stone-200 border-b border-stone-700 pb-2 flex items-center gap-2">
                <Info size={20} className="text-amber-500" /> Scope
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-stone-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"/> Things to do on a weekly/daily basis</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"/> Performance and input configuration</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"/> Weapon roles and pairing</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"/> Leveling and breakthrough order</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"/> Mystic Arts, Talents, Inner Arts</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"/> Gear, Resonance, weekly systems, and co-op</li>
            </ul>
          </section>

          {/* Daily & Weekly Routine */}
          <section className="bg-stone-800/50 rounded-lg p-5 border border-stone-700/50">
            <h2 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <CheckSquare size={20} /> Daily & Weekly Routine
            </h2>

            <div className="space-y-8">
                {/* Daily */}
                <div>
                    <h3 className="text-stone-100 font-bold mb-3 border-l-4 border-emerald-600 pl-3">Daily Checklist</h3>
                    <div className="space-y-4 text-sm text-stone-300">
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">1. Spend Mental Energy</strong>
                            Never let it cap. Use it on one stronghold or any small objective.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">2. Complete one casual activity</strong>
                            Pitch-Pot is quickest.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">3. Visit your home</strong>
                            Use the grooming interaction.<br/>
                            <span className="text-stone-500 italic">To find the home, you can go to blissful retreat, house on the left, interact with the Table mirror.</span>
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">4. Buy daily/weekly-limited materials</strong>
                            Prioritise useful items that have a limited amount of stock on a daily/weekly basis.
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-400">
                                <li>Menu &gt; Shop &gt; Items: <span className="text-amber-500">Lingering Melody</span></li>
                                <li>Menu &gt; Season &gt; Season Shop: <span className="text-amber-500">Oscillating Jade, Life Supplies Support Box, Martial Arts Chest, Inner Way Note Chest, Small Box of Commerce Coins</span></li>
                                <li>If you see: <span className="text-white">raw ore / coarse fur</span> (buy all 99 if available)</li>
                            </ul>
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">5. Handle guild events (if unlocked)</strong>
                            Some chains require multiple days. Start early so you don't miss the weekly completion.
                        </div>
                    </div>
                </div>

                {/* Weekly */}
                <div>
                    <h3 className="text-stone-100 font-bold mb-3 border-l-4 border-emerald-600 pl-3">Weekly Checklist</h3>
                    <div className="space-y-4 text-sm text-stone-300">
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">1. Weekly Dungeon (Hero's Realm)</strong>
                            Do before reset. Ideally do it later in the week after upgrades.<br/>
                            You can do it twice when you are in the guild. Matching with AI leads to less rewards~
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">3. Use weekly jade fish and echo jades</strong>
                            Spend on internal arts, skill breakthroughs, and progression items.<br/>
                            Jade fish: Season Shop<br/>
                            Echo jade: Merchants (you can mouse over the echo jade item to see the location of these merchants)<br/>
                            <span className="text-stone-400 italic">Avoid cosmetic purchases (though that is fine if cosmetics are your goal).</span>
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">4. Stronghold farming</strong>
                            Below Lv40: just prevent Mental Energy capping.<br/>
                            Above Lv40: target boss-type strongholds for set gear and high-tier materials.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">5. Recycle unused gear</strong>
                            Every replaced item should be dismantled.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">6. Finish multi-day sect/guild tasks</strong>
                            Anything requiring 3 days of the week should be started early.
                        </div>
                    </div>
                </div>

                {/* Avoiding Waste */}
                <div>
                    <h3 className="text-stone-100 font-bold mb-3 border-l-4 border-amber-600 pl-3">Avoiding Waste</h3>
                    <div className="space-y-4 text-sm text-stone-300">
                         <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">1. Mental Energy rewards scale</strong>
                            Don't farm heavily until mid-game.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">2. Weekly dungeon mats are exclusive</strong>
                            Skipping = permanent loss.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">3. Weekly shop mats compound over time</strong>
                            Always buy them.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">4. Recycling is permanent progression</strong>
                            You should recycle unwanted gears that are blue rarity and below, or if they are below lvl 30. As you progress later on, there will be tuning, which may require other gears.
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-white block">5. Weekly caps &gt; daily tasks</strong>
                            Hit weekly limits first. Use daily tasks to fill gaps.
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* Resets & Schedules */}
          <section className="bg-stone-800/50 rounded-lg p-5 border border-stone-700/50">
            <h2 className="text-lg font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Clock size={20} /> Daily & Weekly Resets/Schedules
            </h2>
            
            <div className="space-y-6 text-sm text-stone-300">
                <div>
                    <h3 className="font-bold text-white mb-2">General Information</h3>
                    <div className="bg-stone-900/50 p-4 rounded space-y-2">
                        <p><strong className="text-amber-500">Reset Timings:</strong> Server considers a new day at 21:00 UST.</p>
                        <p>It is considered a new week on a <strong className="text-amber-500">Monday</strong>.</p>
                    </div>
                </div>

                <div>
                     <h3 className="font-bold text-white mb-2">Schedules/Resets</h3>
                     <div className="grid grid-cols-1 gap-3">
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-blue-300 block mb-1">Saturday & Sunday</strong>
                            Guild war, Fireworks event in Kaifeng, buying of merchant commodities from the merchant NPC in Kaifeng
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-blue-300 block mb-1">Monday onwards</strong>
                            <ul className="list-disc pl-5 space-y-1 text-stone-400">
                                <li>Weekly shop reset (jade fish shop and also farm the jade fish to reach the weekly cap of 20k, social shop, guild shop, sect shop, weapon challenge shop).</li>
                                <li>Bond lvl refresh, start farming bond lvl with your friends, master, disciples, marriage partner (has a weekly cap).</li>
                                <li>Weekly 10 man boss raid, 5 man boss raid, guild 10 man boss raid.</li>
                                <li>Weekly cap of sect points refresh, complete daily sect tasks to get to the cap.</li>
                                <li>群力共伐, in the online mode, enter an instance to fight a giant fish twice for rewards.</li>
                                <li>Weekly cap of battle pass points refresh.</li>
                                <li>Weekly tasks from your guild will be refresh.</li>
                            </ul>
                        </div>
                        <div className="bg-stone-900/50 p-3 rounded">
                            <strong className="text-blue-300 block mb-1">Wednesday onwards</strong>
                            Selling of commodities to an NPC in other player's world
                        </div>
                     </div>
                </div>
            </div>
          </section>

          {/* Settings & Optimization */}
          <section className="bg-stone-800/50 rounded-lg p-5 border border-stone-700/50">
             <h2 className="text-lg font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Settings size={20} /> Settings & Optimization
            </h2>
            <p className="text-sm text-stone-400 mb-4">
                These configurations ensure smooth combat timing and consistent frame delivery. Stability and clarity take priority over visual quality since frame drops directly affect parry accuracy.
            </p>

            <div className="space-y-6">
                {/* Display */}
                <div>
                     <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><Monitor size={16}/> Display & Graphics</h3>
                     <div className="bg-stone-900/50 rounded overflow-hidden">
                        <table className="w-full text-sm text-left text-stone-300">
                            <thead className="text-xs text-stone-500 uppercase bg-stone-900">
                                <tr>
                                    <th className="px-4 py-2">Setting</th>
                                    <th className="px-4 py-2">Value</th>
                                    <th className="px-4 py-2">Reason</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800">
                                <tr>
                                    <td className="px-4 py-2 font-medium text-white">Display Mode</td>
                                    <td className="px-4 py-2">Fullscreen</td>
                                    <td className="px-4 py-2">Prevents focus loss and frame hitching.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-medium text-white">FPS Limit</td>
                                    <td className="px-4 py-2">Uncapped/120+</td>
                                    <td className="px-4 py-2">Higher framerate = smoother input timing.</td>
                                </tr>
                                 <tr>
                                    <td className="px-4 py-2 font-medium text-white">V-Sync</td>
                                    <td className="px-4 py-2">Off</td>
                                    <td className="px-4 py-2">Reduces input delay for tighter parries.</td>
                                </tr>
                                 <tr>
                                    <td className="px-4 py-2 font-medium text-white">Motion Blur</td>
                                    <td className="px-4 py-2">Off</td>
                                    <td className="px-4 py-2">Removes visual delay cues; improves clarity.</td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                     <p className="text-xs text-stone-500 mt-2">Justification: Combat performance relies on visual clarity and frame consistency. Disable all motion and post-processing effects that distort attack telegraphs.</p>
                </div>

                {/* Controls */}
                <div>
                     <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><Gamepad2 size={16}/> Control Layout</h3>
                     <p className="text-xs text-stone-400 mb-2">This game rewards fast reaction timing. Bind offensive and defensive tools to opposite sides of your mouse and keyboard.</p>
                     <div className="bg-stone-900/30 p-4 rounded text-sm grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                        <div className="flex justify-between border-b border-stone-800 pb-1"><span className="text-stone-500">Light Attack</span> <span className="text-white font-mono">Left Mouse</span></div>
                        <div className="flex justify-between border-b border-stone-800 pb-1"><span className="text-stone-500">Parry</span> <span className="text-white font-mono">Forward Mouse Button</span></div>
                        <div className="flex justify-between border-b border-stone-800 pb-1"><span className="text-stone-500">Dodge</span> <span className="text-white font-mono">Back Mouse Button</span></div>
                        <div className="flex justify-between border-b border-stone-800 pb-1"><span className="text-stone-500">Weapon Skill 1/2</span> <span className="text-white font-mono">Q / E</span></div>
                        <div className="flex justify-between border-b border-stone-800 pb-1"><span className="text-stone-500">Mystic Arts</span> <span className="text-white font-mono">1–4</span></div>
                        <div className="flex justify-between border-b border-stone-800 pb-1"><span className="text-stone-500">Movement / Lightness</span> <span className="text-white font-mono">F</span></div>
                     </div>
                     <p className="text-xs text-stone-500 mt-2">Reasoning: Separating defense (mouse) and offense (keyboard) prevents input conflict. It lets you chain parry-dodge-attack smoothly without delay frames.</p>
                </div>

                {/* Camera */}
                 <div>
                     <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><Video size={16}/> Camera Configuration</h3>
                     <div className="bg-stone-900/50 rounded overflow-hidden">
                        <table className="w-full text-sm text-left text-stone-300">
                            <thead className="text-xs text-stone-500 uppercase bg-stone-900">
                                <tr>
                                    <th className="px-4 py-2">Setting</th>
                                    <th className="px-4 py-2">Recommended</th>
                                    <th className="px-4 py-2">Purpose</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800">
                                <tr>
                                    <td className="px-4 py-2 font-medium text-white">Camera Distance</td>
                                    <td className="px-4 py-2">Wide</td>
                                    <td className="px-4 py-2">Improves awareness and tracking.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-medium text-white">Horizontal Sensitivity</td>
                                    <td className="px-4 py-2">6–8</td>
                                    <td className="px-4 py-2">Allows smooth horizontal tracking during combos.</td>
                                </tr>
                                 <tr>
                                    <td className="px-4 py-2 font-medium text-white">Vertical Sensitivity</td>
                                    <td className="px-4 py-2">5–6</td>
                                    <td className="px-4 py-2">Prevents over-aiming in aerial duels.</td>
                                </tr>
                                 <tr>
                                    <td className="px-4 py-2 font-medium text-white">Camera Correction</td>
                                    <td className="px-4 py-2">Off or Close</td>
                                    <td className="px-4 py-2">Avoids automatic repositioning that disrupts timing.</td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                     <p className="text-xs text-stone-500 mt-2">Reasoning: A wider camera FOV allows you to read enemy tells earlier. Over-corrected cameras can shift unexpectedly mid-combo, breaking parry direction control.</p>
                </div>

                {/* Network */}
                <div>
                     <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><Globe size={16}/> Network Settings</h3>
                     <div className="bg-stone-900/30 p-4 rounded text-sm text-stone-300">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Real-time hit registration relies on latency stability, not raw speed.</li>
                            <li>Use a wired Ethernet connection; Wi-Fi introduces packet jitter.</li>
                            <li>Avoid VPNs unless they lower ping to the target server.</li>
                        </ul>
                        <p className="text-xs text-stone-500 mt-2">Reasoning: The engine uses prediction-based syncing. Consistent latency improves timing windows for parries and dodges more than raw bandwidth.</p>
                     </div>
                </div>

                 {/* Performance */}
                <div>
                     <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><TrendingUp size={16}/> Performance Checklist</h3>
                     <div className="bg-stone-900/30 p-4 rounded text-sm text-stone-300">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Cap FPS only if system heat throttles above 120 FPS.</li>
                            <li>Update GPU drivers to the latest WHQL build; this game uses heavy DX12 threading.</li>
                            <li>Close background overlays (Discord, Steam FPS counter) to reduce stutter.</li>
                            <li><strong className="text-red-400">Run the game from SSD storage</strong>; HDD loading causes animation desync in cutscenes.</li>
                        </ul>
                        <p className="text-xs text-stone-500 mt-2">These configurations minimize microstutter and input lag. Consistency in frame pacing is more important than absolute graphical fidelity.</p>
                     </div>
                </div>
            </div>
          </section>

          {/* Pre-Game Config */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-stone-200 border-b border-stone-700 pb-2">Pre-Game Configuration</h2>
            <p className="text-sm text-stone-400">This section covers all six start-up screens in Where Winds Meet. These settings directly affect UI behavior, camera control, and gameplay efficiency. Adjust them before starting your character.</p>
            
            <div className="grid grid-cols-1 gap-4 text-sm text-stone-300">
                <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <span className="text-amber-500 font-bold block mb-1">Guidance Mode</span>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li><strong className="text-white">Detailed</strong> – Recommended for first-time players. Shows all exploration prompts, quest markers, and pathing aids. Prevents early confusion and ensures access to hidden unlocks tied to tutorial triggers.</li>
                        <li><strong className="text-white">Moderate</strong> – Keeps quest highlights for main objectives only. Use this once you understand map routing and NPC logic.</li>
                        <li><strong className="text-white">Minimal</strong> – Minimal UI support. Only for veterans who already know location patterns and resource layouts.</li>
                    </ul>
                    <p className="text-emerald-400 font-semibold">Recommended: Start on Detailed, switch to Moderate later for cleaner screen space. Disabling guidance too early can delay system unlocks and early rewards tied to first-time triggers.</p>
                </div>

                 <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <span className="text-amber-500 font-bold block mb-1">Operation Mode</span>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li><strong className="text-white">ARPG</strong> – Camera follows player direction automatically. Ideal for mouse + keyboard users.</li>
                        <li><strong className="text-white">MMORPG</strong> – Manual camera drag. Requires holding a key for rotation.</li>
                    </ul>
                    <p className="text-emerald-400 font-semibold">Recommended: ARPG Mode. The automatic camera lock minimizes micro-adjustment lag in melee combat and preserves parry precision.</p>
                </div>

                 <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <span className="text-amber-500 font-bold block mb-1">Game Difficulty</span>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li><strong className="text-white">Story</strong> – Easiest mode. Reduces incoming damage and increases healing rate.</li>
                        <li><strong className="text-white">Recommended</strong> – Balanced tuning used by most system tests.</li>
                        <li><strong className="text-white">Expert</strong> – Enemies gain increased HP and damage.</li>
                        <li><strong className="text-white">Legend</strong> – Locked-in hard mode. Must be chosen at character creation.</li>
                        <li><strong className="text-white">Hardcore</strong> – Hardcore mode; character deletion on death.</li>
                    </ul>
                    <p className="text-emerald-400 font-semibold">Recommended: “Recommended” for general optimization. Only choose “Legend” if you want permanent difficulty scaling and understand parry frames perfectly. Once changed, it cannot be re-enabled without remaking the character.</p>
                </div>
                
                 <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <span className="text-amber-500 font-bold block mb-1">Social Tendency</span>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li><strong className="text-white">Shared Journey</strong> – Enables co-op, PvP, and social encounters.</li>
                        <li><strong className="text-white">Lone Wanderer</strong> – Pure single-player. No multiplayer events.</li>
                    </ul>
                    <p className="text-emerald-400 font-semibold">Recommended: Shared Journey. Most systems (guilds, co-op, trade) require this setting. It can be toggled later if needed.</p>
                </div>

                <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <span className="text-amber-500 font-bold block mb-1">Character Customization</span>
                    <p>First three appearance edits are free. Later changes require a customization token. Create your intended final look early to avoid token costs.</p>
                </div>

                 <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <span className="text-amber-500 font-bold block mb-1">Name and Talent Selection</span>
                    <p className="mb-2">Choose your in-game alias, then pick one Talent. Talents apply passive world buffs:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li><strong className="text-white">Drunken Precision</strong> – Boosts rewards in mini-games and alcohol-related events.</li>
                        <li><strong className="text-white">Rhetoric Edge</strong> – Improves persuasion checks in dialogue-based quests.</li>
                    </ul>
                    <p className="text-emerald-400 font-semibold">Recommended: Rhetoric Edge for long-term value. Min-max builds prefer interaction scaling over situational mini-game bonuses.</p>
                </div>
            </div>
          </section>

          {/* Progression & Leveling */}
          <section className="bg-stone-800/50 rounded-lg p-5 border border-stone-700/50">
            <h2 className="text-lg font-bold text-amber-500 mb-6 flex items-center gap-2">
                <TrendingUp size={20} /> Progression & Leveling
            </h2>
            
            <div className="space-y-4 text-sm text-stone-300">
                 <div className="bg-stone-900/50 p-4 rounded border-l-4 border-amber-600">
                    <strong className="text-white block mb-2">Progression Priority</strong>
                    <p className="mb-2">
                        <strong className="text-emerald-400">Always push the Main Story first.</strong><br/>
                        Your XP cap is tied to the story, and level breakthroughs only unlock once you reach the required chapter. You also gain a lot of XP doing the story. Breakthrough rewards scale with each tier, so the sooner you unlock them, the stronger your long-term progression.
                    </p>
                    <p className="mb-2 font-bold text-white">When you hit a level cap, perform your breakthrough immediately.</p>
                    <p>After advancing the story as far as the current patch allows, use remaining time to:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Clear daily/weekly tasks</li>
                        <li>Spend Mental Power efficiently</li>
                        <li>Explore regions and clean up side quests</li>
                    </ul>
                 </div>
            </div>
          </section>

          {/* Exchange Codes */}
          <section className="bg-stone-800/50 rounded-lg p-5 border border-stone-700/50">
             <h2 className="text-lg font-bold text-purple-400 mb-6 flex items-center gap-2">
                <Gift size={20} /> Exchange Codes
            </h2>
            <p className="text-sm text-stone-400 mb-4 flex items-center gap-2">
                <Info size={16} /> You can input exchange codes in <span className="font-mono bg-stone-900 px-1 rounded text-white">Settings &gt; Other &gt; Exchange Code</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-white font-bold mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Ongoing</h3>
                    <ul className="bg-stone-900/50 p-3 rounded text-sm font-mono text-emerald-300 space-y-1">
                        <li>WWMGLyoutube</li>
                        <li>WWMGLtiktok</li>
                        <li>WWMGO1114</li>
                        <li>WWM251115</li>
                        <li>WWMGO1115</li>
                    </ul>
                </div>
                <div>
                     <h3 className="text-stone-400 font-bold mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Expired</h3>
                     <div className="bg-stone-900/50 p-3 rounded text-sm text-stone-500 italic">
                        None currently listed.
                     </div>
                </div>
            </div>
          </section>

          {/* Known Bugs */}
          <section className="bg-stone-800/50 rounded-lg p-5 border border-red-900/30">
            <h2 className="text-lg font-bold text-red-400 mb-6 flex items-center gap-2">
                <AlertTriangle size={20} /> Known Bugs (DO TAKE NOTE)
            </h2>
            <div className="bg-stone-900/50 p-4 rounded text-sm text-stone-300">
                <strong className="text-white block mb-1">General Shrine can't be completed</strong>
                <p>General Shrine is currently not completable as you are not able to befriend <span className="text-amber-500">Fang Xu</span>. Till the developers fix the chat with Fang Xu, the General Shrine's Old Friend completion will be stuck at 5/6.</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-stone-200 border-b border-stone-700 pb-2 flex items-center gap-2">
                 <HelpCircle size={20} className="text-blue-400" /> Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 text-sm text-stone-300">
                <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <strong className="text-white block mb-1">Why did Hero's Realm attempt not count into the Guild event?</strong>
                    <p>If you are in a guild, you can do Hero's Realm twice. On your second try, you will receive a reward at the very end of the second stage, and it will also count into your guild event.</p>
                </div>
                 <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <strong className="text-white block mb-1">Where is the 5v5 arena?</strong>
                    <p>Although it shows up in the game messages sometimes, the 5v5 arena is yet to be released. (as of 25/11/2025)</p>
                </div>
                <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <strong className="text-white block mb-1">I am dying in PvP, and my combat mastery is low</strong>
                    <p>Always focus on only <strong className="text-amber-500">ONE</strong> martial path (ex. Bellstrike, Silkbind, etc) and stick to it. This is so that you don't spread the resources you need too thin.</p>
                </div>
                 <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <strong className="text-white block mb-1">Outposts Challenge or Campaign Challenge?</strong>
                    <p>If you are not in need of a specific gear, always do <strong className="text-amber-500">outposts</strong>, as they come with extra resources (ex. Ebon Iron). If you are lacking of a specific gear for your set, do the campaign challenge that is tailored to that set.</p>
                </div>
                <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <strong className="text-white block mb-1">Doing 20 co-op poses for guild event is tiring</strong>
                    <p>You can have a friend stay in a particular multiplayer pose (Ex. horse stance), and then: <br/> <span className="font-mono bg-stone-900 px-1 rounded text-white">Press F</span> &gt; Move away &gt; Repeat x20</p>
                </div>
                <div className="bg-stone-800 p-4 rounded border border-stone-700">
                    <strong className="text-white block mb-1">Clearing the Guild Transporter is a pain</strong>
                    <p>You can quickly access the merchant from the guild transporter by hovering over the item that you need and click on the suggested merchants. It will provide you with instant access to the merchant so that you can buy the resource that you need.</p>
                </div>
            </div>
          </section>

          {/* Final Notes */}
          <section className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-xl border border-stone-700 text-center space-y-4">
            <h2 className="text-xl font-bold text-white">Final Notes - Join our guild ;)</h2>
            <p className="text-sm text-stone-400 italic">
                With that being said, this guide is not perfect and was written originally based off the Chinese server, so some of the translation is not perfect.
            </p>
            <div className="inline-block bg-indigo-900/50 border border-indigo-500/30 p-4 rounded-lg">
                <p className="text-indigo-200 font-bold">JOIN OUR GUILD: <span className="text-white text-lg">WeHateitHere</span></p>
                <p className="text-indigo-300 text-sm mt-1">Discord.gg/weh8</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-4">
                <a 
                    href="https://www.paypal.com/donate/?business=P6P5JA7WRBM36&no_recurring=0&item_name=If+you+enjoyed+any+of+the+apps+I%27ve+created%2C+please+donate+and+buy+me+a+coffee.+Thank+you+and+I+hope+you%27ve+enjoyed+my+work%21&currency_code=USD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl transition-all hover:scale-105 text-center group"
                >
                    <div className="flex flex-col items-center gap-2">
                        <Coffee size={32} className="group-hover:rotate-12 transition-transform" />
                        <span>Buy me a coffee!</span>
                        <span className="text-xs font-normal opacity-80 text-amber-100">Support the development</span>
                    </div>
                </a>
            </div>
        </div>

      </div>
    </div>
  );
};
