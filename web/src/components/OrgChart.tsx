import { useMemo } from 'react'
import type { Role } from '../types'

interface OrgChartProps {
  roles: Role[]
  selectedRoleId: string | null
  onSelectRole: (role: Role) => void
}

interface RoleNode extends Role {
  children: RoleNode[]
}

export default function OrgChart({ roles, selectedRoleId, onSelectRole }: OrgChartProps) {
  const tree = useMemo(() => buildTree(roles), [roles])
  const isPeerStructure = tree.length > 1 || (tree.length === 1 && tree[0].children.length === 0 && roles.length > 1)

  if (isPeerStructure && tree.length === roles.length) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {roles.map(role => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRoleId === role.id}
            isDimmed={selectedRoleId !== null && selectedRoleId !== role.id}
            onClick={() => onSelectRole(role)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {tree.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          selectedRoleId={selectedRoleId}
          onSelectRole={onSelectRole}
          isRoot
        />
      ))}
    </div>
  )
}

function buildTree(roles: Role[]): RoleNode[] {
  const roleMap = new Map<string, RoleNode>()
  
  roles.forEach(role => {
    roleMap.set(role.id, { ...role, children: [] })
  })

  const roots: RoleNode[] = []

  roleMap.forEach(node => {
    if (node.reports_to === null) {
      roots.push(node)
    } else {
      const parent = roleMap.get(node.reports_to)
      if (parent) {
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    }
  })

  return roots
}

interface TreeNodeProps {
  node: RoleNode
  selectedRoleId: string | null
  onSelectRole: (role: Role) => void
  isRoot?: boolean
}

function TreeNode({ node, selectedRoleId, onSelectRole, isRoot }: TreeNodeProps) {
  const hasChildren = node.children.length > 0

  return (
    <div className={`flex flex-col items-center ${isRoot ? '' : 'mt-2'}`}>
      {!isRoot && (
        <div className="w-px h-4 bg-[var(--border)]" />
      )}
      
      <RoleCard
        role={node}
        isSelected={selectedRoleId === node.id}
        isDimmed={selectedRoleId !== null && selectedRoleId !== node.id}
        onClick={() => onSelectRole(node)}
      />

      {hasChildren && (
        <>
          <div className="w-px h-4 bg-[var(--border)]" />
          
          <div className="relative flex items-start">
            {node.children.length > 1 && (
              <div 
                className="absolute top-0 h-px bg-[var(--border)]"
                style={{
                  left: '50%',
                  width: `calc(100% - ${100 / node.children.length}%)`,
                  transform: 'translateX(-50%)'
                }}
              />
            )}
            
            <div className="flex gap-2 md:gap-4">
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  {node.children.length > 1 && (
                    <div className="w-px h-4 bg-[var(--border)]" />
                  )}
                  <TreeNode
                    node={child}
                    selectedRoleId={selectedRoleId}
                    onSelectRole={onSelectRole}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface RoleCardProps {
  role: Role
  isSelected: boolean
  isDimmed: boolean
  onClick: () => void
}

function RoleCard({ role, isSelected, isDimmed, onClick }: RoleCardProps) {
  const kindColors: Record<string, string> = {
    orchestrator: 'border-l-amber-500',
    specialist: 'border-l-[var(--accent)]',
    optional_peer: 'border-l-emerald-500'
  }

  return (
    <button
      onClick={onClick}
      className={`
        role-node text-left w-44 md:w-52 p-3 rounded-lg border-l-4 bg-[var(--bg-card)]
        border border-[var(--border)] shadow-sm
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
        ${kindColors[role.kind] || 'border-l-gray-400'}
        ${isSelected ? 'selected ring-2 ring-[var(--accent)] bg-[var(--highlight)]' : ''}
        ${isDimmed ? 'dimmed' : ''}
      `}
    >
      <div className="font-medium text-[var(--text-primary)] text-sm mb-1 truncate">
        {role.name}
      </div>
      <div className="text-xs text-[var(--text-muted)] capitalize">
        {role.kind.replace('_', ' ')}
      </div>
    </button>
  )
}
