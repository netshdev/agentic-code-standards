#!/usr/bin/env node

/**
 * Agentic Code Standards CLI
 * Interactive installer for AI coding agent standards
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header() {
  console.log('');
  log('🤖 Agentic Code Standards', 'cyan');
  log('━'.repeat(60), 'cyan');
  log('Production-ready standards for AI coding agents', 'bright');
  console.log('');
}

function detectAITool() {
  const cwd = process.cwd();
  
  if (fs.existsSync(path.join(cwd, '.cursorrules'))) return 'cursor';
  if (fs.existsSync(path.join(cwd, '.windsurfrules'))) return 'windsurf';
  if (fs.existsSync(path.join(cwd, '.agent'))) return 'antigravity';
  if (fs.existsSync(path.join(cwd, '.github', 'copilot-instructions.md'))) return 'copilot';
  
  return null;
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.bright}${prompt}${colors.reset} `, resolve);
  });
}

async function selectProfile() {
  console.log('');
  log('📋 Choose your profile:', 'blue');
  console.log('');
  log('  1. Minimal        Essential rules only (great for getting started)');
  log('  2. Standard       Recommended baseline ⭐ (most popular)');
  log('  3. Strict         All rules enforced (maximum code quality)');
  log('  4. Accessibility  WCAG 2.1+ focused (a11y priority)');
  console.log('');
  
  const answer = await question('Enter number (1-4) [default: 2]:');
  const choice = answer.trim() || '2';
  
  const profiles = {
    '1': 'minimal',
    '2': 'standard',
    '3': 'strict',
    '4': 'accessibility'
  };
  
  return profiles[choice] || 'standard';
}

async function selectTool() {
  const detected = detectAITool();
  
  if (detected) {
    console.log('');
    log(`✅ Detected: ${detected.charAt(0).toUpperCase() + detected.slice(1)}`, 'green');
    const answer = await question(`Continue with ${detected}? (Y/n):`);
    if (!answer.trim() || answer.toLowerCase() === 'y') {
      return detected;
    }
  }
  
  console.log('');
  log('🛠️  Select your AI coding tool:', 'blue');
  console.log('');
  log('  1. Cursor           (.cursorrules)');
  log('  2. Windsurf         (.windsurfrules)');
  log('  3. Antigravity      (.agent/rules/)');
  log('  4. GitHub Copilot   (.github/copilot-instructions.md)');
  log('  5. Universal        Works with most tools ⭐');
  console.log('');
  
  const answer = await question('Enter number (1-5) [default: 5]:');
  const choice = answer.trim() || '5';
  
  const tools = {
    '1': 'cursor',
    '2': 'windsurf',
    '3': 'antigravity',
    '4': 'copilot',
    '5': 'universal'
  };
  
  return tools[choice] || 'universal';
}

function copyTemplate(profile, tool) {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const cwd = process.cwd();
  
  try {
    if (tool === 'antigravity') {
      // Copy Antigravity .agent/rules/ structure
      const sourceDir = path.join(templatesDir, 'antigravity', profile, '.agent', 'rules');
      const targetDir = path.join(cwd, '.agent', 'rules');
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      const files = fs.readdirSync(sourceDir);
      files.forEach(file => {
        fs.copyFileSync(
          path.join(sourceDir, file),
          path.join(targetDir, file)
        );
      });
      
      console.log('');
      log(`✨ Created .agent/rules/ with ${profile} profile`, 'green');
      log(`   Files: ${files.join(', ')}`, 'cyan');
      
    } else if (tool === 'copilot') {
      const sourceFile = path.join(templatesDir, profile, '.cursorrules');
      const targetDir = path.join(cwd, '.github');
      const targetFile = path.join(targetDir, 'copilot-instructions.md');
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      fs.copyFileSync(sourceFile, targetFile);
      
      console.log('');
      log(`✨ Created .github/copilot-instructions.md with ${profile} profile`, 'green');
      
    } else {
      const sourceFile = path.join(templatesDir, profile, '.cursorrules');
      let targetFile;
      
      if (tool === 'windsurf') {
        targetFile = path.join(cwd, '.windsurfrules');
      } else {
        targetFile = path.join(cwd, '.cursorrules');
      }
      
      fs.copyFileSync(sourceFile, targetFile);
      
      console.log('');
      log(`✨ Created ${path.basename(targetFile)} with ${profile} profile`, 'green');
    }
    
    return true;
  } catch (error) {
    console.log('');
    log(`❌ Error: ${error.message}`, 'red');
    return false;
  }
}

function showNextSteps(tool, profile) {
  console.log('');
  log('🎉 Setup complete!', 'green');
  console.log('');
  log('Next steps:', 'bright');
  log('  1. Review your rules file(s)');
  log('  2. Customize for your project needs');
  log('  3. Start coding with your AI agent!');
  console.log('');
  
  log('📚 Documentation:', 'blue');
  log('  https://github.com/netshdev/agentic-code-standards');
  console.log('');
  
  if (tool === 'antigravity') {
    log('💡 Tip: Antigravity auto-loads rules from .agent/rules/', 'yellow');
  } else if (tool === 'copilot') {
    log('💡 Tip: Copilot reads instructions from .github/copilot-instructions.md', 'yellow');
  } else {
    log('💡 Tip: Your AI agent will automatically use these rules', 'yellow');
  }
  
  console.log('');
  log('⭐ Star us on GitHub if this helped!', 'cyan');
  console.log('');
}

async function main() {
  try {
    header();
    
    const profile = await selectProfile();
    const tool = await selectTool();
    
    console.log('');
    log('⚙️  Installing...', 'cyan');
    
    const success = copyTemplate(profile, tool);
    
    if (success) {
      showNextSteps(tool, profile);
    }
    
    rl.close();
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.log('');
    log(`❌ Error: ${error.message}`, 'red');
    log('Please report this issue on GitHub', 'yellow');
    rl.close();
    process.exit(1);
  }
}

// Handle command line args
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === 'init') {
  main();
} else if (args[0] === '--version' || args[0] === '-v') {
  const packageJson = require('../package.json');
  console.log(packageJson.version);
  process.exit(0);
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log('');
  log('Usage: npx agentic-code-standards [command]', 'cyan');
  console.log('');
  log('Commands:');
  log('  init              Initialize standards (default)');
  log('  --version, -v     Show version');
  log('  --help, -h        Show this help');
  console.log('');
  process.exit(0);
} else {
  log('Unknown command. Use --help for usage information.', 'red');
  process.exit(1);
}
